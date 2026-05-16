import { seriesService } from '../api/seriesService.js';
import { createCard } from '../components/Card.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderPagination, bindPaginationEvents } from '../components/Pagination.js';

let currentSelectedGenre = "";
let currentCatalogPage = 1;

export async function renderSeriesPage(viewportElement) {
  // 1. Structural base layout shell matching your columns
  viewportElement.innerHTML = `
    <div class="series-view-wrapper" style="display: flex; gap: 30px; padding: 30px 4%; max-width: 1400px; margin: 0 auto;">
      <div id="series-sidebar-placement"></div>
      <div class="catalog-main-feed" style="flex-grow: 1;">
        <h2 id="catalog-title" style="margin-bottom: 20px; font-size: 1.6rem;">TV Series Catalog</h2>
        <div id="series-grid-outlet"></div>
        <div id="series-pagination-outlet"></div>
      </div>
    </div>
  `;

  // 2. Fetch the TV categories list and inject into the sidebar layout
  const genrePayload = await seriesService.getSeriesGenres();
  if (genrePayload && genrePayload.genres) {
    document.getElementById('series-sidebar-placement').innerHTML = renderSidebar(
      genrePayload.genres,
      (selectedGenreId) => {
        currentSelectedGenre = selectedGenreId;
        currentCatalogPage = 1; // Reset view indexes back to 1
        loadSeriesGridContent();
      }
    );
  }

  // 3. Child rendering data pipeline function
  async function loadSeriesGridContent() {
    const gridOutlet = document.getElementById('series-grid-outlet');
    const paginationOutlet = document.getElementById('series-pagination-outlet');
    
    gridOutlet.innerHTML = `<div style="padding: 40px; text-align: center; color: #666;">Populating TV records...</div>`;
    paginationOutlet.innerHTML = "";

    // Pull television items through the decoupled service layer
    const seriesData = await seriesService.getSeriesByGenre(currentSelectedGenre, currentCatalogPage);

    if (seriesData && seriesData.results.length > 0) {
      gridOutlet.innerHTML = `
        <div class="cards-grid">
          ${seriesData.results.map(tvShow => createCard(tvShow, 'tv')).join('')}
        </div>
      `;

      paginationOutlet.innerHTML = renderPagination(currentCatalogPage, seriesData.total_pages);
      
      bindPaginationEvents(currentCatalogPage, seriesData.total_pages, (targetPageNumber) => {
        currentCatalogPage = targetPageNumber;
        loadSeriesGridContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      gridOutlet.innerHTML = `<p style="padding: 40px; text-align: center; color: var(--text-muted);">No shows located in this genre category.</p>`;
    }
  }

  // Execute base loop dynamically
  loadSeriesGridContent();
}