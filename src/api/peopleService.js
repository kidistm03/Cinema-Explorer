// ============================================================
// peopleService.js
// PURPOSE: All celebrity/people-related API calls. Nothing else.
// ============================================================

import { fetchFromTMDB } from './apiClient.js';

/** Trending people (hero + trending section) */
export async function getTrendingPeople() {
  const data = await fetchFromTMDB('/trending/person/week');
  return data.results;
}

/** Paginated list of all popular celebrities */
export async function getAllCelebrities(page = 1) {
  return await fetchFromTMDB(`/person/popular?language=en-US&page=${page}`);
}
