// Wallet type definition
export interface Wallet {
  id: string;
  name: string;
  color: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  cardIds: string[];
  isCollapsed?: boolean;
}

// Card type definition
export interface Card {
  id: string;
  walletId: string;
  layerId: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  icon: string;
  iconColor: string;
  chart?: ChartData;
  table?: TableData;
  remarks?: string;
}

// Layer type definition
export interface Layer {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  locked: boolean;
  icon: string;
}

// Chart data definition
export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: ChartPoint[];
}

export interface ChartPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// Table data definition
export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
}

export interface TableColumn {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
}

export interface TableRow {
  id: string;
  [key: string]: string | number | boolean;
}

// Map marker definition
export interface MapMarker {
  id: string;
  cardId: string;
  latitude: number;
  longitude: number;
  title: string;
  icon: string;
  iconColor: string;
}

// Window state definition
export interface WindowState {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
  zIndex: number;
}

// Application state definition
export interface AppState {
  wallets: Map<string, Wallet>;
  cards: Map<string, Card>;
  layers: Map<string, Layer>;
  selectedCardId: string | null;
  selectedWalletId: string | null;
  selectedLayerId: string | null;
  mapZoom: number;
  mapCenter: { lat: number; lng: number };
  isDarkMode: boolean;
}
