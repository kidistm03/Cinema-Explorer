import { fetchFromTMDB } from './tmdbConfig.js';

export const seriesService = {
  // Pulls recent TV shows for the Series Page hero section carousel [cite: 48, 250]
  getRecentSeries: () => fetchFromTMDB('/tv/now_playing?language=en-US&page=1'),

  // Pulls the top trending TV shows for the week [cite: 241]
  getTrendingSeries: () => fetchFromTMDB('/trending/tv/week'),

  // Fetches the entire category checklist mapping for the TV sidebar [cite: 52]
  getSeriesGenres: () => fetchFromTMDB('/genre/tv/list?language=en'),

  // Fetches TV series filtered by genre ID with support for pagination [cite: 54, 250]
  getSeriesByGenre: (genreId, page = 1) => {
    const queryPath = genreId
      ? `/discover/tv?with_genres=${genreId}&page=${page}&language=en-US`
      : `/tv/popular?language=en-US&page=${page}`;
    return fetchFromTMDB(queryPath);
  }
};