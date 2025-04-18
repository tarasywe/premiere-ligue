import axios, { AxiosError } from 'axios';
import { ApiResponse, Team, Player, SquadPlayer, SquadResponse } from '../types/api';
import { API_CONFIG, LEAGUE_ID, CURRENT_SEASON } from '../config/api';

// Queue for managing API requests
class RequestQueue {
  private queue: (() => Promise<any>)[] = [];
  private processing = false;
  private lastRequestTime = 0;
  private minRequestInterval = 1000; // Minimum 1 second between requests

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const now = Date.now();
          const timeSinceLastRequest = now - this.lastRequestTime;
          if (timeSinceLastRequest < this.minRequestInterval) {
            await new Promise(r => setTimeout(r, this.minRequestInterval - timeSinceLastRequest));
          }
          this.lastRequestTime = Date.now();
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      if (request) await request();
    }
    this.processing = false;
  }
}

const requestQueue = new RequestQueue();

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
});

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 429 && retries > 0) {
        // Get retry delay from headers or use exponential backoff
        const retryAfter = parseInt(error.response.headers['retry-after'] || '0') * 1000;
        const waitTime = retryAfter || delay;
        
        console.log(`Rate limited. Retrying in ${waitTime}ms... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        return retryWithExponentialBackoff(operation, retries - 1, delay * 2);
      }
      
      // Handle other API errors
      if (error.response?.status === 404) {
        throw new Error('Resource not found');
      }
      if (error.response?.status === 401) {
        throw new Error('API key is invalid or expired');
      }
    }
    throw error;
  }
}

export const searchTeams = async (query: string): Promise<Team[]> => {
  return requestQueue.add(async () => {
    try {
      const operation = async () => {
        // Search for teams by name only
        const searchResponse = await api.get<ApiResponse<Team[]>>('/teams', {
          params: {
            search: query
          },
        });

        // Return first 20 teams from the response
        return searchResponse.data.response.slice(0, 20);
      };

      return await retryWithExponentialBackoff(operation);
    } catch (error) {
      if (error instanceof Error) {
        // Throw user-friendly error messages
        if (error.message === 'Resource not found') {
          throw new Error('No teams found matching your search');
        }
        if (error.message === 'API key is invalid or expired') {
          throw new Error('Unable to access football data. Please try again later.');
        }
        if (error.message.includes('Rate limited')) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
      }
      console.error('Error searching teams:', error);
      throw new Error('Unable to search teams. Please try again later.');
    }
  });
};

export const getPlayerProfile = async (playerId: number): Promise<Player> => {
  return requestQueue.add(async () => {
    try {
      const operation = async () => {
        const response = await api.get<ApiResponse<Player[]>>('/players', {
          params: {
            id: playerId,
            season: CURRENT_SEASON,
          },
        });
        
        if (!response.data.response.length) {
          throw new Error('Player not found');
        }
        
        return response.data.response[0];
      };

      return await retryWithExponentialBackoff(operation);
    } catch (error) {
      if (error instanceof Error) {
        // Throw user-friendly error messages
        if (error.message === 'Resource not found' || error.message === 'Player not found') {
          throw new Error('Player information not available');
        }
        if (error.message === 'API key is invalid or expired') {
          throw new Error('Unable to access player data. Please try again later.');
        }
        if (error.message.includes('Rate limited')) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
      }
      console.error('Error getting player profile:', error);
      throw new Error('Unable to load player information. Please try again later.');
    }
  });
};

export const getTeamSquad = async (teamId: number): Promise<SquadPlayer[]> => {
  return requestQueue.add(async () => {
    try {
      const operation = async () => {
        const response = await api.get<ApiResponse<SquadResponse[]>>('/players/squads', {
          params: {
            team: teamId,
          },
        });
        
        // Return the players array from the first response item
        return response.data.response[0]?.players || [];
      };

      return await retryWithExponentialBackoff(operation);
    } catch (error) {
      if (error instanceof Error) {
        // Throw user-friendly error messages
        if (error.message === 'Resource not found') {
          throw new Error('Squad information not available');
        }
        if (error.message === 'API key is invalid or expired') {
          throw new Error('Unable to access squad data. Please try again later.');
        }
        if (error.message.includes('Rate limited')) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
      }
      console.error('Error getting team squad:', error);
      throw new Error('Unable to load squad information. Please try again later.');
    }
  });
}; 