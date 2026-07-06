import { create } from 'zustand';
import { Wallet, Card, Layer, WorkspaceState, MapMarker } from '@/models/types';
import { v4 as uuidv4 } from 'uuid';

interface Store {
  // Data
  wallets: Map<string, Wallet>;
  cards: Map<string, Card>;
  layers: Map<string, Layer>;
  markers: Map<string, MapMarker>;
  
  // UI State
  workspaceState: WorkspaceState;
  isDarkMode: boolean;
  showSidebar: boolean;
  selectedPropertyPanel: 'wallet' | 'card' | 'layer' | null;
  
  // History
  history: unknown[];
  historyIndex: number;
  
  // Wallet Actions
  createWallet: (name: string) => Wallet;
  deleteWallet: (id: string) => void;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  renameWallet: (id: string, name: string) => void;
  
  // Card Actions
  createCard: (walletId: string, data: Partial<Card>) => Card;
  deleteCard: (id: string) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  duplicateCard: (id: string) => Card;
  moveCardToWallet: (cardId: string, walletId: string) => void;
  
  // Layer Actions
  createLayer: (name: string) => Layer;
  deleteLayer: (id: string) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  linkCardToLayer: (cardId: string, layerId: string) => void;
  unlinkCardFromLayer: (cardId: string, layerId: string) => void;
  
  // Marker Actions
  updateMarker: (cardId: string, latitude: number, longitude: number) => void;
  getMarkerForCard: (cardId: string) => MapMarker | undefined;
  
  // Selection
  selectObject: (id: string, type: 'wallet' | 'card' | 'layer') => void;
  deselectObject: () => void;
  toggleMultiSelect: (id: string) => void;
  
  // UI State
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  
  // Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
  
  // Undo/Redo
  undo: () => void;
  redo: () => void;
}

const useWorkspaceStore = create<Store>((set, get) => ({
  wallets: new Map(),
  cards: new Map(),
  layers: new Map(),
  markers: new Map(),
  workspaceState: {
    zoom: 1,
    pan: { x: 0, y: 0 },
    selectedObjectId: null,
    selectedObjectType: null,
    multiSelectIds: new Set(),
  },
  isDarkMode: false,
  showSidebar: true,
  selectedPropertyPanel: null,
  history: [],
  historyIndex: -1,

  // Wallet Actions
  createWallet: (name: string) => {
    const wallet: Wallet = {
      id: uuidv4(),
      name,
      color: '#FFFFFF',
      borderColor: '#E0E0E0',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      collapsed: false,
      cardIds: [],
      icon: 'Wallet2',
      iconColor: '#1976D2',
    };
    set((state) => ({
      wallets: new Map(state.wallets).set(wallet.id, wallet),
    }));
    return wallet;
  },

  deleteWallet: (id: string) => {
    set((state) => {
      const newWallets = new Map(state.wallets);
      const wallet = newWallets.get(id);
      if (wallet) {
        // Delete all cards in wallet
        const newCards = new Map(state.cards);
        wallet.cardIds.forEach((cardId) => {
          newCards.delete(cardId);
        });
        newWallets.delete(id);
        return { wallets: newWallets, cards: newCards };
      }
      return state;
    });
  },

  updateWallet: (id: string, updates: Partial<Wallet>) => {
    set((state) => {
      const wallet = state.wallets.get(id);
      if (wallet) {
        const newWallets = new Map(state.wallets);
        newWallets.set(id, { ...wallet, ...updates });
        return { wallets: newWallets };
      }
      return state;
    });
  },

  renameWallet: (id: string, name: string) => {
    get().updateWallet(id, { name });
  },

  // Card Actions
  createCard: (walletId: string, data: Partial<Card>) => {
    const card: Card = {
      id: uuidv4(),
      walletId,
      title: data.title || 'Untitled Card',
      description: data.description || '',
      remarks: data.remarks || '',
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
      position: data.position || { x: Math.random() * 200, y: Math.random() * 200 },
      color: data.color || '#FFFFFF',
      borderColor: data.borderColor || '#E0E0E0',
      icon: data.icon || 'MapPin',
      iconColor: data.iconColor || '#D32F2F',
      layerIds: [],
      charts: [],
      tables: [],
      markerIcon: 'MapPin',
      markerIconColor: '#D32F2F',
    };

    set((state) => {
      const newCards = new Map(state.cards);
      newCards.set(card.id, card);

      const wallet = state.wallets.get(walletId);
      if (wallet) {
        const newWallets = new Map(state.wallets);
        newWallets.set(walletId, {
          ...wallet,
          cardIds: [...wallet.cardIds, card.id],
        });
        return { cards: newCards, wallets: newWallets };
      }
      return { cards: newCards };
    });

    // Create marker
    get().updateMarker(card.id, card.latitude, card.longitude);

    return card;
  },

  deleteCard: (id: string) => {
    set((state) => {
      const card = state.cards.get(id);
      if (card) {
        const newCards = new Map(state.cards);
        newCards.delete(id);

        const wallet = state.wallets.get(card.walletId);
        if (wallet) {
          const newWallets = new Map(state.wallets);
          newWallets.set(card.walletId, {
            ...wallet,
            cardIds: wallet.cardIds.filter((cid) => cid !== id),
          });
          return { cards: newCards, wallets: newWallets };
        }

        const newMarkers = new Map(state.markers);
        Array.from(newMarkers.entries()).forEach(([markerId, marker]) => {
          if (marker.cardId === id) {
            newMarkers.delete(markerId);
          }
        });
        return { cards: newCards, markers: newMarkers };
      }
      return state;
    });
  },

  updateCard: (id: string, updates: Partial<Card>) => {
    set((state) => {
      const card = state.cards.get(id);
      if (card) {
        const newCards = new Map(state.cards);
        const updatedCard = { ...card, ...updates };
        newCards.set(id, updatedCard);

        // Update marker if position changed
        if (updates.latitude !== undefined || updates.longitude !== undefined) {
          get().updateMarker(id, updates.latitude ?? card.latitude, updates.longitude ?? card.longitude);
        }

        return { cards: newCards };
      }
      return state;
    });
  },

  duplicateCard: (id: string) => {
    const card = get().cards.get(id);
    if (card) {
      return get().createCard(card.walletId, {
        ...card,
        position: { x: card.position.x + 20, y: card.position.y + 20 },
      });
    }
    throw new Error('Card not found');
  },

  moveCardToWallet: (cardId: string, walletId: string) => {
    set((state) => {
      const card = state.cards.get(cardId);
      if (!card) return state;

      const oldWallet = state.wallets.get(card.walletId);
      const newWallet = state.wallets.get(walletId);

      if (oldWallet && newWallet) {
        const newWallets = new Map(state.wallets);
        newWallets.set(oldWallet.id, {
          ...oldWallet,
          cardIds: oldWallet.cardIds.filter((id) => id !== cardId),
        });
        newWallets.set(newWallet.id, {
          ...newWallet,
          cardIds: [...newWallet.cardIds, cardId],
        });

        const newCards = new Map(state.cards);
        newCards.set(cardId, { ...card, walletId });

        return { wallets: newWallets, cards: newCards };
      }
      return state;
    });
  },

  // Layer Actions
  createLayer: (name: string) => {
    const layer: Layer = {
      id: uuidv4(),
      name,
      icon: 'Layers',
      iconColor: '#FF9800',
      cardIds: [],
    };
    set((state) => ({
      layers: new Map(state.layers).set(layer.id, layer),
    }));
    return layer;
  },

  deleteLayer: (id: string) => {
    set((state) => {
      const newLayers = new Map(state.layers);
      newLayers.delete(id);
      return { layers: newLayers };
    });
  },

  updateLayer: (id: string, updates: Partial<Layer>) => {
    set((state) => {
      const layer = state.layers.get(id);
      if (layer) {
        const newLayers = new Map(state.layers);
        newLayers.set(id, { ...layer, ...updates });
        return { layers: newLayers };
      }
      return state;
    });
  },

  linkCardToLayer: (cardId: string, layerId: string) => {
    set((state) => {
      const card = state.cards.get(cardId);
      const layer = state.layers.get(layerId);

      if (card && layer) {
        const newCards = new Map(state.cards);
        const newLayers = new Map(state.layers);

        if (!card.layerIds.includes(layerId)) {
          newCards.set(cardId, {
            ...card,
            layerIds: [...card.layerIds, layerId],
          });
        }

        if (!layer.cardIds.includes(cardId)) {
          newLayers.set(layerId, {
            ...layer,
            cardIds: [...layer.cardIds, cardId],
          });
        }

        return { cards: newCards, layers: newLayers };
      }
      return state;
    });
  },

  unlinkCardFromLayer: (cardId: string, layerId: string) => {
    set((state) => {
      const card = state.cards.get(cardId);
      const layer = state.layers.get(layerId);

      if (card && layer) {
        const newCards = new Map(state.cards);
        const newLayers = new Map(state.layers);

        newCards.set(cardId, {
          ...card,
          layerIds: card.layerIds.filter((id) => id !== layerId),
        });

        newLayers.set(layerId, {
          ...layer,
          cardIds: layer.cardIds.filter((id) => id !== cardId),
        });

        return { cards: newCards, layers: newLayers };
      }
      return state;
    });
  },

  // Marker Actions
  updateMarker: (cardId: string, latitude: number, longitude: number) => {
    set((state) => {
      const newMarkers = new Map(state.markers);
      const markerId = `marker-${cardId}`;
      const card = state.cards.get(cardId);

      if (card) {
        newMarkers.set(markerId, {
          id: markerId,
          cardId,
          latitude,
          longitude,
          title: card.title,
          icon: card.markerIcon,
          iconColor: card.markerIconColor,
        });
      }

      return { markers: newMarkers };
    });
  },

  getMarkerForCard: (cardId: string) => {
    const state = get();
    const markerId = `marker-${cardId}`;
    return state.markers.get(markerId);
  },

  // Selection
  selectObject: (id: string, type: 'wallet' | 'card' | 'layer') => {
    set({
      workspaceState: {
        ...get().workspaceState,
        selectedObjectId: id,
        selectedObjectType: type,
        multiSelectIds: new Set(),
      },
      selectedPropertyPanel: type,
    });
  },

  deselectObject: () => {
    set({
      workspaceState: {
        ...get().workspaceState,
        selectedObjectId: null,
        selectedObjectType: null,
        multiSelectIds: new Set(),
      },
      selectedPropertyPanel: null,
    });
  },

  toggleMultiSelect: (id: string) => {
    set((state) => {
      const newIds = new Set(state.workspaceState.multiSelectIds);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return {
        workspaceState: {
          ...state.workspaceState,
          multiSelectIds: newIds,
        },
      };
    });
  },

  // UI State
  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
  },

  toggleSidebar: () => {
    set((state) => ({ showSidebar: !state.showSidebar }));
  },

  setZoom: (zoom: number) => {
    set((state) => ({
      workspaceState: {
        ...state.workspaceState,
        zoom: Math.max(0.1, Math.min(5, zoom)),
      },
    }));
  },

  setPan: (x: number, y: number) => {
    set((state) => ({
      workspaceState: {
        ...state.workspaceState,
        pan: { x, y },
      },
    }));
  },

  // Persistence
  saveToLocalStorage: () => {
    const state = get();
    const data = {
      wallets: Array.from(state.wallets.values()),
      cards: Array.from(state.cards.values()),
      layers: Array.from(state.layers.values()),
      markers: Array.from(state.markers.values()),
      workspaceState: state.workspaceState,
    };
    localStorage.setItem('workspace-data', JSON.stringify(data));
  },

  loadFromLocalStorage: () => {
    const data = localStorage.getItem('workspace-data');
    if (data) {
      const parsed = JSON.parse(data);
      set({
        wallets: new Map(parsed.wallets.map((w: Wallet) => [w.id, w])),
        cards: new Map(parsed.cards.map((c: Card) => [c.id, c])),
        layers: new Map(parsed.layers.map((l: Layer) => [l.id, l])),
        markers: new Map(parsed.markers.map((m: MapMarker) => [m.id, m])),
        workspaceState: parsed.workspaceState,
      });
    }
  },

  exportJSON: () => {
    const state = get();
    return JSON.stringify({
      wallets: Array.from(state.wallets.values()),
      cards: Array.from(state.cards.values()),
      layers: Array.from(state.layers.values()),
      markers: Array.from(state.markers.values()),
    }, null, 2);
  },

  importJSON: (json: string) => {
    const data = JSON.parse(json);
    set({
      wallets: new Map(data.wallets.map((w: Wallet) => [w.id, w])),
      cards: new Map(data.cards.map((c: Card) => [c.id, c])),
      layers: new Map(data.layers.map((l: Layer) => [l.id, l])),
      markers: new Map(data.markers.map((m: MapMarker) => [m.id, m])),
    });
  },

  // Undo/Redo
  undo: () => {
    // Placeholder for undo logic
  },

  redo: () => {
    // Placeholder for redo logic
  },
}));

export default useWorkspaceStore;
