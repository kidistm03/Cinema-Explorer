// ============================================================
// movieService.js
// PURPOSE: All movie-related API calls. Nothing else.
// ============================================================

import { fetchFromTMDB } from './apiClient.js';

/** Hero carousel: 5 most recent movies */
export async function getNowPlayingMovies(page = 1) {
  const data = await fetchFromTMDB(`/movie/now_playing?language=en-US&page=${page}`);
  return data.results;
}

/** Trending section on Home page */
export async function getTrendingMovies() {
  const data = await fetchFromTMDB('/trending/movie/week');
  return data.results;
}

/** Trending section on Movies page (popular) */
export async function getPopularMovies(page = 1) {
  return await fetchFromTMDB(`/movie/popular?language=en-US&page=${page}`);
}

/** Genre-filtered grid + pagination on Movies page */
export async function getMoviesByGenre(genreId, page = 1) {
  return await fetchFromTMDB(
    `/discover/movie?with_genres=${genreId}&page=${page}&language=en-US`
  );
}
