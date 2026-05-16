import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderHomePage } from './pages/home.js';
import { renderMoviesPage } from './pages/movies.js';
import { renderSeriesPage } from './pages/series.js';      // Added
import { renderCelebritiesPage } from './pages/celebrities.js'; // Added

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('navbar-container');
  const mainViewport = document.getElementById('app-viewport');
  const footerContainer = document.getElementById('footer-container');

  /**
   * Application Single Page Navigation Core Handler Logic Engine
   */
  const handleRouting = async (pageKey) => {
    // Inject clean unified intermediate interface block before fetching responses asynchronously
    mainViewport.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 50vh;">
        <div style="color: #aaa; font-size: 1.1rem; letter-spacing: 1px;">Syncing data channel rows...</div>
      </div>
    `;
    
    switch(pageKey) {
      case 'home':
        await renderHomePage(mainViewport);
        break;
      case 'movies':
        await renderMoviesPage(mainViewport);
        break;
      case 'series':
        await renderSeriesPage(mainViewport); // Load dynamic series panel view grid structures
        break;
      case 'celebrities':
        await renderCelebritiesPage(mainViewport); // Load partitioned profile network grids
        break;
      default:
        await renderHomePage(mainViewport);
    }
  };

  // 1. Kick off shared structures
  renderNavbar(headerContainer, (targetPage) => {
    handleRouting(targetPage);
  });
  
  renderFooter(footerContainer);

  // 2. Load the initial homepage automatically on start
  handleRouting('home');
});