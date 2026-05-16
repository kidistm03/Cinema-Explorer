import { movieService } from '../api/movieService.js';
import { createCard } from '../components/Card.js';

export async function renderHomePage(viewport) {
  viewport.innerHTML = `
    <div style="padding: 20px 4%;">
      <div id="hero-banner" style="height: 400px; border-radius: 12px; background-size: cover; background-position: center; display: flex; align-items: flex-end; margin-bottom: 40px; position: relative; overflow: hidden;"></div>
      
      <section style="margin-bottom: 40px;">
        <h2>Trending Movies</h2>
        <div class="cards-grid" id="trending-movies-row"></div>
      </section>
    </div>
  `;

  // Resolve multiple data feeds simultaneously
  const [recentMovies, trendingMovies] = await Promise.all([
    movieService.getRecentMovies(),
    movieService.getTrendingMovies()
  ]);

  // Handle Spotlight Carousel Element [cite: 15-16]
  const banner = document.getElementById('hero-banner');
  if (recentMovies?.results?.length > 0) {
    const feature = recentMovies.results[0];
    banner.style.backgroundImage = `linear-gradient(to top, rgba(18,18,18,1), rgba(0,0,0,0.3)), url('https://image.tmdb.org/t/p/original${feature.backdrop_path}')`;
    banner.innerHTML = `
      <div style="padding: 30px; position: relative; z-index: 2;">
        <h1 style="font-size: 2.5rem; margin-bottom: 10px;">${feature.title}</h1>
        <p style="max-width: 600px; color: #ccc;">${feature.overview}</p>
      </div>
    `;
  }

  // Populate row elements cleanly [cite: 17-18]
  const moviesRow = document.getElementById('trending-movies-row');
  if (trendingMovies?.results) {
    moviesRow.innerHTML = trendingMovies.results.slice(0, 5).map(m => createCard(m, 'movie')).join('');
  }
}