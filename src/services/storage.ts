/**
 * Local storage service for persistence
 */

import type { AppState } from '@types/index';

const STORAGE_KEY = 'workspace-app-state';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export const storageService = {
  /**
   * Save state to local storage
   */
  saveState: (state: AppState): void => {
    try {
      const serialized = JSON.stringify(
        {
          ...state,
          wallets: Array.from(state.wallets.entries()),
          cards: Array.from(state.cards.entries()),
          layers: Array.from(state.layers.entries()),
        },
        null,
        2
      );
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  },

  /**
   * Load state from local storage
   */
  loadState: (): AppState | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        wallets: new Map(parsed.wallets || []),
        cards: new Map(parsed.cards || []),
        layers: new Map(parsed.layers || []),
      };
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
      return null;
    }
  },

  /**
   * Export state as JSON file
   */
  exportAsJSON: (state: AppState): void => {
    try {
      const dataStr = JSON.stringify(
        {
          ...state,
          wallets: Array.from(state.wallets.entries()),
          cards: Array.from(state.cards.entries()),
          layers: Array.from(state.layers.entries()),
        },
        null,
        2
      );
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `workspace-export-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export state as JSON:', error);
    }
  },

  /**
   * Import state from JSON file
   */
  importFromJSON: (file: File): Promise<AppState | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const result = event.target?.result as string;
          const parsed = JSON.parse(result);
          const state: AppState = {
            ...parsed,
            wallets: new Map(parsed.wallets || []),
            cards: new Map(parsed.cards || []),
            layers: new Map(parsed.layers || []),
          };
          resolve(state);
        } catch (error) {
          console.error('Failed to import state from JSON:', error);
          resolve(null);
        }
      };
      reader.readAsText(file);
    });
  },

  /**
   * Clear all stored data
   */
  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};

export default storageService;
