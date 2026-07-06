// Wallet Model
export interface Wallet {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  position: Position;
  collapsed: boolean;
  cardIds: string[];
  icon?: string;
  iconColor?: string;
}

// Card Model
export interface Card {
  id: string;
  walletId: string;
  title: string;
  description: string;
  remarks: string;
  latitude: number;
  longitude: number;
  position: Position;
  color: string;
  borderColor: string;
  icon?: string;
  iconColor?: string;
  layerIds: string[];
  charts: Chart[];
  tables: Table[];
  markerIcon?: string;
  markerIconColor?: string;
}

// Layer Model
export interface Layer {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  cardIds: string[];
}

// Chart Model
export type ChartType = 'line' | 'bar' | 'pie';

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface Chart {
  id: string;
  type: ChartType;
  title: string;
  data: ChartDataPoint[];
  color?: string;
}

// Table Model
export interface TableRow {
  id: string;
  cells: string[];
}

export interface Table {
  id: string;
  title: string;
  columns: string[];
  rows: TableRow[];
}

// Position Model
export interface Position {
  x: number;
  y: number;
}

// Map Marker
export interface MapMarker {
  id: string;
  cardId: string;
  latitude: number;
  longitude: number;
  title: string;
  icon?: string;
  iconColor?: string;
}

// Workspace State
export interface WorkspaceState {
  zoom: number;
  pan: Position;
  selectedObjectId: string | null;
  selectedObjectType: 'wallet' | 'card' | 'layer' | null;
  multiSelectIds: Set<string>;
}

// Undo/Redo History
export interface HistoryEntry {
  timestamp: number;
  action: string;
  data: unknown;
}
