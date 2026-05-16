import { movieService } from '../api/movieService.js';
import { createCard } from '../components/Card.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderPagination, bindPaginationEvents } from '../components/Pagination.js';

// Local state tracking variables isolated to this context shell
let currentSelectedGenre = "";
let currentCatalogPage = 1;

export async function renderMoviesPage(viewportElement) {
  // 1. Structural base container placement matching Figma's columns
  viewportElement.innerHTML = `
    <div class="movies-view-wrapper" style="display: flex; gap: 30px; padding: 30px 4%; max-width: 1400px; margin: 0 auto;">
      <div id="movies-sidebar-placement"></div>
      <div class="catalog-main-feed" style="flex-grow: 1;">
        <h2 id="catalog-title" style="margin-bottom: 20px; font-size: 1.6rem;">All Movies</h2>
        <div id="movies-grid-outlet"></div>
        <div id="movies-pagination-outlet"></div>
      </div>
    </div>
  `;

  // 2. Load the initial categories list into the sidebar container
  const genrePayload = await movieService.getMovieGenres();
  if (genrePayload && genrePayload.genres) {
    document.getElementById('movies-sidebar-placement').innerHTML = renderSidebar(
      genrePayload.genres,
      (selectedGenreId) => {
        // Reset state and fetch new filtered data when a category changes [cite: 225-227]
        currentSelectedGenre = selectedGenreId;
        currentCatalogPage = 1; 
        loadMovieGridContent();
      }
    );
  }

  // 3. Independent child data rendering pipeline function
  async function loadMovieGridContent() {
    const gridOutlet = document.getElementById('movies-grid-outlet');
    const paginationOutlet = document.getElementById('movies-pagination-outlet');
    
    gridOutlet.innerHTML = `<div style="padding: 40px; text-align: center; color: #666;">Populating film entries...</div>`;
    paginationOutlet.innerHTML = "";

    // Fetch movies based on current configuration selections [cite: 38]
    const movieData = await movieService.getMoviesByGenre(currentSelectedGenre, currentCatalogPage);

    if (movieData && movieData.results.length > 0) {
      // Inject cards grid
      gridOutlet.innerHTML = `
        <div class="cards-grid">
          ${movieData.results.map(movie => createCard(movie, 'movie')).join('')}
        </div>
      `;

      // Inject pagination controls 
      paginationOutlet.innerHTML = renderPagination(currentCatalogPage, movieData.total_pages);
      
      // Bind navigation event listeners [cite: 226]
      bindPaginationEvents(currentCatalogPage, movieData.total_pages, (targetPageNumber) => {
        currentCatalogPage = targetPageNumber;
        loadMovieGridContent();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll back to view header
      });
    } else {
      gridOutlet.innerHTML = `<p style="padding: 40px; text-align: center; color: var(--text-muted);">No entries located tracking this category type context.</p>`;
    }
  }

  // Kick off initial catalog item retrieval operations automatically
  loadMovieGridContent();
}