// ============================================================
// app.js
// PURPOSE: App entry point and router.
// Decides which page to render based on navigate() calls.
// This is the only file that imports all 4 page renderers.
// ============================================================

import { renderHome } from './pages/home.js';
import { renderMovies } from './pages/movies.js';
import { renderSeries } from './pages/series.js';
import { renderCelebrities } from './pages/celebrities.js';

// The root div where everything renders (see index.html)
const app = document.getElementById('app');

/**
 * navigate(page) — our simple client-side router.
 * Call navigate('movies') to switch to the Movies page.
 * @param {string} page - 'home' | 'movies' | 'series' | 'celebrities'
 */
function navigate(page) {
  window.scrollTo(0, 0); // Scroll to top on page change

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

// Start the app on the Home page
navigate('home');
