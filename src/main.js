// ============================================================
// main.js
// PURPOSE: App entry point and router.
// This is the "brain" of the app — it decides which page to render
// based on what the user clicked.
// ============================================================

import { renderHome } from './pages/home.js';
import { renderMovies } from './pages/movies.js';
import { renderSeries } from './pages/series.js';
import { renderCelebrities } from './pages/celebrities.js';

// The root container where everything renders
const appContainer = document.getElementById('app');

/**
 * The navigate function is our simple router.
 * Call navigate('movies') to go to the Movies page, etc.
 * @param {string} page - 'home' | 'movies' | 'series' | 'celebrities'
 * @param {object} params - Optional extra data (e.g., { query: 'batman' })
 */
function navigate(page, params = {}) {
  // Scroll to top when changing pages
  window.scrollTo(0, 0);

  // Clear the app container before rendering the new page
  appContainer.innerHTML = '';

  // Route to the correct page renderer
  switch (page) {
    case 'home':
      renderHome(appContainer, navigate);
      break;

    case 'movies':
      renderMovies(appContainer, navigate);
      break;

    case 'series':
      renderSeries(appContainer, navigate);
      break;

    case 'celebrities':
      renderCelebrities(appContainer, navigate);
      break;

    default:
      // Fallback: go home if route not found
      renderHome(appContainer, navigate);
  }
}

// ============================================================
// START THE APP
// ============================================================
// Load the Home page when the app first opens
navigate('home');
