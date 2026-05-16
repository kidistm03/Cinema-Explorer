import { peopleService } from '../api/peopleService.js';
import { createCard } from '../components/Card.js';
import { renderPagination, bindPaginationEvents } from '../components/Pagination.js';

let currentPeoplePage = 1;

export async function renderCelebritiesPage(viewportElement) {
  viewportElement.innerHTML = `
    <div style="padding: 20px 4%; max-width: 1400px; margin: 0 auto;">
      <div id="celeb-hero-banner" style="height: 350px; border-radius: 12px; background-size: cover; background-position: center 20%; display: flex; align-items: flex-end; margin-bottom: 40px;"></div>
      
      <section>
        <h2 style="margin-bottom: 20px; font-size: 1.6rem;">Popular Celebrities</h2>
        <div id="celebrities-grid-outlet"></div>
        <div id="celebrities-pagination-outlet"></div>
      </section>
    </div>
  `;

  // 1. Fetch weekly trending individuals to fill out the top spotlight panel [cite: 62-63]
  const trendingPeople = await peopleService.getTrendingPeople();
  const banner = document.getElementById('celeb-hero-banner');
  
  if (trendingPeople?.results?.length > 0) {
    const starSpotlight = trendingPeople.results[0];
    banner.style.backgroundImage = `linear-gradient(to top, rgba(18,18,18,1), rgba(0,0,0,0.2)), url('https://image.tmdb.org/t/p/original${starSpotlight.backdrop_path || starSpotlight.profile_path}')`;
    banner.innerHTML = `
      <div style="padding: 30px;">
        <span style="background-color: #e50914; padding: 4px 10px; font-size: 0.8rem; text-transform: uppercase; border-radius: 4px; font-weight: bold; letter-spacing: 1px;">Weekly Spotlight</span>
        <h1 style="font-size: 2.5rem; margin-top: 8px; margin-bottom: 5px;">${starSpotlight.name}</h1>
        <p style="color: #ccc; font-size: 1rem;">Trending for: ${starSpotlight.known_for_department || 'Acting'}</p>
      </div>
    `;
  }

  // 2. Fetch the continuous popular celebrities grid layout framework [cite: 64-67]
  async function loadCelebritiesGrid() {
    const gridOutlet = document.getElementById('celebrities-grid-outlet');
    const paginationOutlet = document.getElementById('celebrities-pagination-outlet');

    gridOutlet.innerHTML = `<div style="padding: 40px; text-align: center; color: #666;">Populating celebrity listings...</div>`;
    
    const celebData = await peopleService.getAllCelebrities(currentPeoplePage);

    if (celebData && celebData.results) {
      gridOutlet.innerHTML = `
        <div class="cards-grid">
          ${celebData.results.map(person => createCard(person, 'person')).join('')}
        </div>
      `;

      paginationOutlet.innerHTML = renderPagination(currentPeoplePage, celebData.total_pages);

      bindPaginationEvents(currentPeoplePage, celebData.total_pages, (targetPageNumber) => {
        currentPeoplePage = targetPageNumber;
        loadCelebritiesGrid();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Auto-initiate grid view instantly
  loadCelebritiesGrid();
}