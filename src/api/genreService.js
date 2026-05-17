// ============================================================
// genreService.js
// PURPOSE: Fetch genre lists for movies and TV. Nothing else.
// ============================================================

import { fetchFromTMDB } from './apiClient.js';

/** All movie genres — used in Movies page sidebar */
export async function getMovieGenres() {
  const data = await fetchFromTMDB('/genre/movie/list?language=en');
  return data.genres;
}

/** All TV genres — used in Series page sidebar */
export async function getTVGenres() {
  const data = await fetchFromTMDB('/genre/tv/list?language=en');
  return data.genres;
}
