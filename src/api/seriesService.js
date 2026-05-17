// ============================================================
// seriesService.js
// PURPOSE: All TV series-related API calls. Nothing else.
// ============================================================

import { fetchFromTMDB } from './apiClient.js';

/** Hero carousel: currently airing shows */
export async function getOnAirSeries(page = 1) {
  const data = await fetchFromTMDB(`/tv/on_the_air?language=en-US&page=${page}`);
  return data.results;
}

/** Trending section on Home page */
export async function getTrendingSeries() {
  const data = await fetchFromTMDB('/trending/tv/week');
  return data.results;
}

/** Trending section on Series page (popular) */
export async function getPopularSeries(page = 1) {
  return await fetchFromTMDB(`/tv/popular?language=en-US&page=${page}`);
}

/** Genre-filtered grid + pagination on Series page */
export async function getSeriesByGenre(genreId, page = 1) {
  return await fetchFromTMDB(
    `/discover/tv?with_genres=${genreId}&page=${page}&language=en-US`
  );
}
