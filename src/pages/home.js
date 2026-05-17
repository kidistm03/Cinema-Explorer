// ============================================================
// home.js
// PURPOSE: Renders the Homepage.
// Sections: Hero (now playing), Trending Movies, Trending Series, Trending People.
// ============================================================

import { createNavbar, initNavbar } from '../components/Navbar.js';
import { createFooter } from '../components/Footer.js';
import { createHero, initHero } from '../components/Hero.js';
import { createMediaCard, createPersonCard } from '../components/Card.js';

import { getNowPlayingMovies, getTrendingMovies } from '../api/movieService.js';
import { getTrendingSeries } from '../api/seriesService.js';
import { getTrendingPeople } from '../api/peopleService.js';

export async function renderHome(container, navigate) {
  // 1. Render the page shell with loading placeholders
  container.innerHTML = `
    ${createNavbar('home')}
    <main>
      <div id="hero-container"><div class="loading">Loading...</div></div>

      <section class="section">
        <h2 class="section__title">Trending Movies</h2>
        <div class="cards-grid" id="trending-movies"><div class="loading">Loading...</div></div>
      </section>

      <section class="section">
        <h2 class="section__title">Trending Shows</h2>
        <div class="cards-grid" id="trending-series"><div class="loading">Loading...</div></div>
      </section>

      <section class="section">
        <h2 class="section__title">Trending People</h2>
        <div class="cards-grid" id="trending-people"><div class="loading">Loading...</div></div>
      </section>
    </main>
    ${createFooter()}
  `;

  // 2. Hook up navbar click events
  initNavbar(navigate);

  // 3. Fetch all data at the same time (parallel = faster)
  try {
    const [nowPlaying, trendingMovies, trendingSeries, trendingPeople] = await Promise.all([
      getNowPlayingMovies(),
      getTrendingMovies(),
      getTrendingSeries(),
      getTrendingPeople(),
    ]);

    // 4. Hero
    document.getElementById('hero-container').innerHTML = createHero(nowPlaying, 'movie');
    initHero();

    // 5. Trending Movies
    document.getElementById('trending-movies').innerHTML = trendingMovies
      .slice(0, 6)
      .map((m) => createMediaCard(m, 'movie'))
      .join('');

    // 6. Trending Series
    document.getElementById('trending-series').innerHTML = trendingSeries
      .slice(0, 6)
      .map((s) => createMediaCard(s, 'tv'))
      .join('');

    // 7. Trending People
    document.getElementById('trending-people').innerHTML = trendingPeople
      .slice(0, 6)
      .map((p) => createPersonCard(p))
      .join('');

  } catch (err) {
    console.error('Home page failed:', err);
  }
}
