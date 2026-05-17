// ============================================================
// series.js
// PURPOSE: Renders the Series page.
// Same layout as movies.js but uses TV endpoints.
// ============================================================

import { createNavbar, initNavbar } from '../components/Navbar.js';
import { createFooter } from '../components/Footer.js';
import { createHero, initHero } from '../components/Hero.js';
import { createMediaCard } from '../components/Card.js';
import { createSidebar, initSidebar } from '../components/Sidebar.js';
import { createPagination, initPagination } from '../components/Pagination.js';

import { getOnAirSeries, getTrendingSeries, getSeriesByGenre } from '../api/seriesService.js';
import { getTVGenres } from '../api/genreService.js';

let activeGenreId = null;
let currentPage = 1;
let totalPages = 1;

export async function renderSeries(container, navigate) {
  activeGenreId = null;
  currentPage = 1;

  container.innerHTML = `
    ${createNavbar('series')}
    <main>
      <div id="hero-container"><div class="loading">Loading...</div></div>

      <section class="section">
        <h2 class="section__title">Trending Shows</h2>
        <div class="cards-grid" id="trending-series"><div class="loading">Loading...</div></div>
      </section>

      <section class="section">
        <div class="genre-layout">
          <div id="sidebar-container"><div class="loading">Loading...</div></div>
          <div class="genre-content">
            <h2 class="section__title" id="genre-title">Action & Adventure</h2>
            <div class="cards-grid" id="genre-grid"><div class="loading">Loading...</div></div>
            <div id="pagination-container"></div>
          </div>
        </div>
      </section>
    </main>
    ${createFooter()}
  `;

  initNavbar(navigate);

  try {
    const [onAir, trending, genres] = await Promise.all([
      getOnAirSeries(),
      getTrendingSeries(),
      getTVGenres(),
    ]);

    document.getElementById('hero-container').innerHTML = createHero(onAir, 'tv');
    initHero();

    document.getElementById('trending-series').innerHTML = trending
      .slice(0, 6)
      .map((s) => createMediaCard(s, 'tv'))
      .join('');

    document.getElementById('sidebar-container').innerHTML = createSidebar(genres);
    initSidebar((genreId) => {
      activeGenreId = genreId;
      currentPage = 1;
      const name = genres.find((g) => g.id === genreId)?.name || 'Series';
      document.getElementById('genre-title').textContent = name;
      loadGenreSeries();
    });

    if (genres.length > 0) {
      activeGenreId = genres[0].id;
      document.getElementById('genre-title').textContent = genres[0].name;
    }
    await loadGenreSeries();

  } catch (err) {
    console.error('Series page failed:', err);
  }
}

async function loadGenreSeries() {
  const grid = document.getElementById('genre-grid');
  const pagination = document.getElementById('pagination-container');
  grid.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const data = await getSeriesByGenre(activeGenreId, currentPage);
    totalPages = data.total_pages;

    grid.innerHTML = data.results.map((s) => createMediaCard(s, 'tv')).join('');

    pagination.innerHTML = createPagination(currentPage, totalPages);
    initPagination(currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      loadGenreSeries();
      grid.scrollIntoView({ behavior: 'smooth' });
    });
  } catch (err) {
    grid.innerHTML = '<p class="error">Failed to load series.</p>';
  }
}
