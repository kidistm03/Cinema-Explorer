// ============================================================
// celebrities.js
// PURPOSE: Renders the Celebrities page.
// Sections: Hero (trending people), Trending People, All Celebrities + Pagination.
// ============================================================

import { createNavbar, initNavbar } from '../components/Navbar.js';
import { createFooter } from '../components/Footer.js';
import { createHero, initHero } from '../components/Hero.js';
import { createPersonCard } from '../components/Card.js';
import { createPagination, initPagination } from '../components/Pagination.js';

import { getTrendingPeople, getAllCelebrities } from '../api/peopleService.js';

let currentPage = 1;
let totalPages = 1;

export async function renderCelebrities(container, navigate) {
  currentPage = 1;

  container.innerHTML = `
    ${createNavbar('celebrities')}
    <main>
      <div id="hero-container"><div class="loading">Loading...</div></div>

      <section class="section">
        <h2 class="section__title">Trending People</h2>
        <div class="cards-grid" id="trending-people"><div class="loading">Loading...</div></div>
      </section>

      <section class="section">
        <h2 class="section__title">All Celebrities</h2>
        <div class="cards-grid" id="all-celebrities"><div class="loading">Loading...</div></div>
        <div id="pagination-container"></div>
      </section>
    </main>
    ${createFooter()}
  `;

  initNavbar(navigate);

  try {
    const trending = await getTrendingPeople();

    document.getElementById('hero-container').innerHTML = createHero(trending, 'person');
    initHero();

    document.getElementById('trending-people').innerHTML = trending
      .slice(0, 6)
      .map((p) => createPersonCard(p))
      .join('');

    await loadAllCelebrities();

  } catch (err) {
    console.error('Celebrities page failed:', err);
  }
}

async function loadAllCelebrities() {
  const grid = document.getElementById('all-celebrities');
  const pagination = document.getElementById('pagination-container');
  grid.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const data = await getAllCelebrities(currentPage);
    totalPages = data.total_pages;

    grid.innerHTML = data.results.map((p) => createPersonCard(p)).join('');

    pagination.innerHTML = createPagination(currentPage, totalPages);
    initPagination(currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      loadAllCelebrities();
      grid.scrollIntoView({ behavior: 'smooth' });
    });
  } catch (err) {
    grid.innerHTML = '<p class="error">Failed to load celebrities.</p>';
  }
}
