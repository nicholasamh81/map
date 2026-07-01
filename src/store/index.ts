import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Wallet, Card, Layer, AppState } from '@types/index';

interface StoreState {
  wallets: Map<string, Wallet>;
  cards: Map<string, Card>;
  layers: Map<string, Layer>;
  selectedCardId: string | null;
  selectedWalletId: string | null;
  selectedLayerId: string | null;
  mapZoom: number;
  mapCenter: { lat: number; lng: number };
  isDarkMode: boolean;
  // Wallet actions
  addWallet: (name: string, color: string, icon: string) => string;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;
  // Card actions
  addCard: (walletId: string, layerId: string, title: string) => string;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  moveCardToWallet: (cardId: string, newWalletId: string) => void;
  // Layer actions
  addLayer: (name: string, color: string, icon: string) => string;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  deleteLayer: (id: string) => void;
  // Selection actions
  selectCard: (id: string | null) => void;
  selectWallet: (id: string | null) => void;
  selectLayer: (id: string | null) => void;
  // Map actions
  updateMapZoom: (zoom: number) => void;
  updateMapCenter: (lat: number, lng: number) => void;
  // Theme actions
  toggleDarkMode: () => void;
  // Persistence
  exportData: () => AppState;
  importData: (data: AppState) => void;
  clearAll: () => void;
}

const useStore = create<StoreState>()(n  persist(
    (set, get) => ({
      wallets: new Map(),
      cards: new Map(),
      layers: new Map(),
      selectedCardId: null,
      selectedWalletId: null,
      selectedLayerId: null,
      mapZoom: 13,
      mapCenter: { lat: 51.505, lng: -0.09 },
      isDarkMode: false,

      // Wallet actions
      addWallet: (name: string, color: string, icon: string) => {
        const id = uuidv4();
        const wallet: Wallet = {
          id,
          name,
          color,
          icon,
          position: { x: 100, y: 100 },
          size: { width: 400, height: 300 },
          cardIds: [],
        };
        set((state) => {
          const wallets = new Map(state.wallets);
          wallets.set(id, wallet);
          return { wallets };
        });
        return id;
      },

      updateWallet: (id: string, updates: Partial<Wallet>) => {
        set((state) => {
          const wallets = new Map(state.wallets);
          const wallet = wallets.get(id);
          if (wallet) {
            wallets.set(id, { ...wallet, ...updates });
          }
          return { wallets };
        });
      },

      deleteWallet: (id: string) => {
        set((state) => {
          const wallets = new Map(state.wallets);
          const cards = new Map(state.cards);
          const wallet = wallets.get(id);
          
          // Delete all cards in this wallet
          if (wallet) {
            wallet.cardIds.forEach((cardId) => {
              cards.delete(cardId);
            });
          }
          
          wallets.delete(id);
          return { wallets, cards, selectedWalletId: null };
        });
      },

      // Card actions
      addCard: (walletId: string, layerId: string, title: string) => {
        const id = uuidv4();
        const card: Card = {
          id,
          walletId,
          layerId,
          title,
          description: '',
          latitude: 51.505,
          longitude: -0.09,
          icon: 'location',
          iconColor: '#3B82F6',
        };
        set((state) => {
          const cards = new Map(state.cards);
          const wallets = new Map(state.wallets);
          
          cards.set(id, card);
          const wallet = wallets.get(walletId);
          if (wallet) {
            wallet.cardIds.push(id);
            wallets.set(walletId, wallet);
          }
          
          return { cards, wallets };
        });
        return id;
      },

      updateCard: (id: string, updates: Partial<Card>) => {
        set((state) => {
          const cards = new Map(state.cards);
          const card = cards.get(id);
          if (card) {
            cards.set(id, { ...card, ...updates });
          }
          return { cards };
        });
      },

      deleteCard: (id: string) => {
        set((state) => {
          const cards = new Map(state.cards);
          const wallets = new Map(state.wallets);
          const card = cards.get(id);
          
          // Remove card from wallet
          if (card) {
            const wallet = wallets.get(card.walletId);
            if (wallet) {
              wallet.cardIds = wallet.cardIds.filter((cId) => cId !== id);
              wallets.set(card.walletId, wallet);
            }
          }
          
          cards.delete(id);
          return { cards, wallets, selectedCardId: null };
        });
      },

      moveCardToWallet: (cardId: string, newWalletId: string) => {
        set((state) => {
          const cards = new Map(state.cards);
          const wallets = new Map(state.wallets);
          const card = cards.get(cardId);
          
          if (card) {
            // Remove from old wallet
            const oldWallet = wallets.get(card.walletId);
            if (oldWallet) {
              oldWallet.cardIds = oldWallet.cardIds.filter((id) => id !== cardId);
              wallets.set(card.walletId, oldWallet);
            }
            
            // Add to new wallet
            card.walletId = newWalletId;
            cards.set(cardId, card);
            
            const newWallet = wallets.get(newWalletId);
            if (newWallet) {
              newWallet.cardIds.push(cardId);
              wallets.set(newWalletId, newWallet);
            }
          }
          
          return { cards, wallets };
        });
      },

      // Layer actions
      addLayer: (name: string, color: string, icon: string) => {
        const id = uuidv4();
        const layer: Layer = {
          id,
          name,
          color,
          icon,
          visible: true,
          locked: false,
        };
        set((state) => {
          const layers = new Map(state.layers);
          layers.set(id, layer);
          return { layers };
        });
        return id;
      },

      updateLayer: (id: string, updates: Partial<Layer>) => {
        set((state) => {
          const layers = new Map(state.layers);
          const layer = layers.get(id);
          if (layer) {
            layers.set(id, { ...layer, ...updates });
          }
          return { layers };
        });
      },

      deleteLayer: (id: string) => {
        set((state) => {
          const layers = new Map(state.layers);
          layers.delete(id);
          return { layers, selectedLayerId: null };
        });
      },

      // Selection actions
      selectCard: (id: string | null) => {
        set({ selectedCardId: id });
      },

      selectWallet: (id: string | null) => {
        set({ selectedWalletId: id });
      },

      selectLayer: (id: string | null) => {
        set({ selectedLayerId: id });
      },

      // Map actions
      updateMapZoom: (zoom: number) => {
        set({ mapZoom: zoom });
      },

      updateMapCenter: (lat: number, lng: number) => {
        set({ mapCenter: { lat, lng } });
      },

      // Theme actions
      toggleDarkMode: () => {
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        }));
      },

      // Persistence
      exportData: () => {
        const state = get();
        return {
          wallets: new Map(state.wallets),
          cards: new Map(state.cards),
          layers: new Map(state.layers),
          selectedCardId: state.selectedCardId,
          selectedWalletId: state.selectedWalletId,
          selectedLayerId: state.selectedLayerId,
          mapZoom: state.mapZoom,
          mapCenter: state.mapCenter,
          isDarkMode: state.isDarkMode,
        };
      },

      importData: (data: AppState) => {
        set({
          wallets: new Map(data.wallets),
          cards: new Map(data.cards),
          layers: new Map(data.layers),
          selectedCardId: data.selectedCardId,
          selectedWalletId: data.selectedWalletId,
          selectedLayerId: data.selectedLayerId,
          mapZoom: data.mapZoom,
          mapCenter: data.mapCenter,
          isDarkMode: data.isDarkMode,
        });
      },

      clearAll: () => {
        set({
          wallets: new Map(),
          cards: new Map(),
          layers: new Map(),
          selectedCardId: null,
          selectedWalletId: null,
          selectedLayerId: null,
          mapZoom: 13,
          mapCenter: { lat: 51.505, lng: -0.09 },
          isDarkMode: false,
        });
      },
    }),
    {
      name: 'workspace-store',
      storage: localStorage,
      merge: (persistedState: any, currentState: any) => ({
        ...currentState,
        ...persistedState,
        wallets: new Map(persistedState?.wallets || []),
        cards: new Map(persistedState?.cards || []),
        layers: new Map(persistedState?.layers || []),
      }),
    }
  )
);

export default useStore;
