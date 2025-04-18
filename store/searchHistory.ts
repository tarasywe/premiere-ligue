import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchHistory } from '../types/api';

interface SearchHistoryState {
  history: SearchHistory[];
  addSearch: (query: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  clearHistory: () => Promise<void>;
}

const STORAGE_KEY = '@search_history';

export const useSearchHistory = create<SearchHistoryState>((set) => ({
  history: [],
  
  addSearch: async (query: string) => {
    const newSearch: SearchHistory = {
      query,
      timestamp: Date.now(),
    };
    
    set((state) => {
      const newHistory = [newSearch, ...state.history].slice(0, 10); // Keep only last 10 searches
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return { history: newHistory };
    });
  },
  
  loadHistory: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const history = JSON.parse(stored) as SearchHistory[];
        set({ history });
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  },
  
  clearHistory: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ history: [] });
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  },
})); 