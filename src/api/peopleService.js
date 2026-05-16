import { fetchFromTMDB } from './tmdbConfig.js';

export const peopleService = {
  // Pulls top weekly trending celebrities for the hero frame view spotlight [cite: 62-63, 252]
  getTrendingPeople: () => fetchFromTMDB('/trending/person/week'),

  // Pulls all popular celebrities sorted cleanly with pagination indexing parameters [cite: 66, 252]
  getAllCelebrities: (page = 1) => fetchFromTMDB(`/person/popular?language=en-US&page=${page}`)
};