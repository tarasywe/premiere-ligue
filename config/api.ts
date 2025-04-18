export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'x-rapidapi-key': process.env.EXPO_PUBLIC_API_KEY,
    'x-rapidapi-host': process.env.RAPID_HOST,
  },
} as const;

// League IDs
export const LEAGUE_ID = 39; // Premier League ID
export const CURRENT_SEASON = 2023; // Current season 