// ============================================================
// movies.js
// PURPOSE: Renders the Movies page.
// Sections: Hero, Trending Movies, Genre Sidebar, Genre Grid, Pagination.
// ============================================================

import { createNavbar, initNavbar } from '../components/Navbar.js';
import { createFooter } from '../components/Footer.js';
import { createHero, initHero } from '../components/Hero.js';
import { createMediaCard } from '../components/Card.js';
import { createSidebar, initSidebar } from '../components/Sidebar.js';
import { createPagination, initPagination } from '../components/Pagination.js';

import { getNowPlayingMovies, getTrendingMovies, getMoviesByGenre } from '../api/movieService.js';
import { getMovieGenres } from '../api/genreService.js';

// Page-level state (resets every time this page loads)
let activeGenreId = null;
let currentPage = 1;
let totalPages = 1;

export async function renderMovies(container, navigate) {
  activeGenreId = null;
  currentPage = 1;

  container.innerHTML = `
    ${createNavbar('movies')}
    <main>
      <div id="hero-container"><div class="loading">Loading...</div></div>

      <section class="section">
        <h2 class="section__title">Trending Movies</h2>
        <div class="cards-grid" id="trending-movies"><div class="loading">Loading...</div></div>
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
    const [nowPlaying, trending, genres] = await Promise.all([
      getNowPlayingMovies(),
      getTrendingMovies(),
      getMovieGenres(),
    ]);

    // Hero
    document.getElementById('hero-container').innerHTML = createHero(nowPlaying, 'movie');
    initHero();

    // Trending
    document.getElementById('trending-movies').innerHTML = trending
      .slice(0, 6)
      .map((m) => createMediaCard(m, 'movie'))
      .join('');

    // Sidebar
    document.getElementById('sidebar-container').innerHTML = createSidebar(genres);
    initSidebar((genreId) => {
      activeGenreId = genreId;
      currentPage = 1;
      // Update the section title to the clicked genre name
      const name = genres.find((g) => g.id === genreId)?.name || 'Movies';
      document.getElementById('genre-title').textContent = name;
      loadGenreMovies();
    });

    // Default: load the first genre
    if (genres.length > 0) {
      activeGenreId = genres[0].id;
      document.getElementById('genre-title').textContent = genres[0].name;
    }
    await loadGenreMovies();

  } catch (err) {
    console.error('Movies page failed:', err);
  }
}

// Loads genre movies for activeGenreId + currentPage
async function loadGenreMovies() {
  const grid = document.getElementById('genre-grid');
  const pagination = document.getElementById('pagination-container');
  grid.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const data = await getMoviesByGenre(activeGenreId, currentPage);
    totalPages = data.total_pages;

    grid.innerHTML = data.results.map((m) => createMediaCard(m, 'movie')).join('');

    pagination.innerHTML = createPagination(currentPage, totalPages);
    initPagination(currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      loadGenreMovies();
      grid.scrollIntoView({ behavior: 'smooth' });
    });
  } catch (err) {
    grid.innerHTML = '<p class="error">Failed to load movies.</p>';
  }
}
