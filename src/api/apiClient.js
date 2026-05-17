// ============================================================
// apiClient.js
// PURPOSE: One function that handles ALL fetch calls to TMDB.
// Every service file uses this instead of writing fetch() itself.
// Single Responsibility: only knows how to fetch from TMDB.
// ============================================================

const BASE_URL = 'https://api.themoviedb.org/3';

// Image base URLs — used in Card.js and Hero.js
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

/**
 * Fetches any TMDB endpoint and returns parsed JSON.
 * @param {string} endpoint - e.g. '/movie/popular?page=1'
 * @returns {Promise<object>}
 */
export async function fetchFromTMDB(endpoint) {
  // Read Bearer token from .env (Vite exposes it via import.meta.env)
  const token = import.meta.env.VITE_TMDB_API_KEY;

  const url = `${BASE_URL}${endpoint}`;

  // TMDB requires the token in the Authorization header, NOT in the URL
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchFromTMDB failed:', error);
    throw error;
  }
}
