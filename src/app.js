// ============================================================
// app.js
// PURPOSE: App entry point and router.
// Decides which page to render based on navigate() calls.
// ============================================================

import { renderHome } from './pages/home.js';
import { renderMovies } from './pages/movies.js';
import { renderSeries } from './pages/series.js';
import { renderCelebrities } from './pages/celebrities.js';

// Must match <div id="app"> in index.html
const app = document.getElementById('app');

/**
 * navigate(page) — client-side router.
 * @param {string} page - 'home' | 'movies' | 'series' | 'celebrities'
 */
function navigate(page) {
  window.scrollTo(0, 0);

  switch (page) {
    case 'home':
      renderHome(app, navigate);
      break;
    case 'movies':
      renderMovies(app, navigate);
      break;
    case 'series':
      renderSeries(app, navigate);
      break;
    case 'celebrities':
      renderCelebrities(app, navigate);
      break;
    default:
      renderHome(app, navigate);
  }
}

// Start on Home page
navigate('home');
