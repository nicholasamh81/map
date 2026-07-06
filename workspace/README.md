# Visual Workspace Application

A modern, responsive web application built with React and TypeScript that provides a collaborative visual workspace for organizing information using Wallets, Cards, Layers, and interactive maps.

## Features

### Core Components

- **Interactive Map**: Leaflet-powered map with zoom, pan, and marker support
- **Floating Wallets**: Draggable containers for organizing cards
- **Cards**: Flexible information units with location data
- **Layers**: Logical grouping system for cards
- **Properties Panel**: Real-time object property editing

### User Actions

- Create/Edit/Delete wallets, cards, and layers
- Drag objects freely on the canvas
- Link cards to map markers
- Assign cards to layers
- Search and filter functionality
- Dark/Light mode support
- Auto-save to localStorage
- Export/Import JSON

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand
- **Mapping**: Leaflet + React Leaflet
- **Build Tool**: Vite
- **Charts**: Recharts
- **Icons**: Material Icons + Lucide React

## Project Structure

```
workspace/
├── src/
│   ├── components/
│   │   ├── Map/
│   │   ├── Wallet/
│   │   ├── Card/
│   │   ├── Layer/
│   │   ├── Sidebar/
│   │   ├── PropertiesPanel/
│   │   └── Workspace/
│   ├── hooks/
│   ├── store/
│   │   └── workspaceStore.ts
│   ├── models/
│   │   └── types.ts
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Installation

```bash
cd workspace
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## Data Model

### Wallet
```typescript
interface Wallet {
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
```

### Card
```typescript
interface Card {
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
```

### Layer
```typescript
interface Layer {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  cardIds: string[];
}
```

## Key Features

### Drag and Drop
- Wallets and cards can be dragged anywhere on the canvas
- Smooth animations and visual feedback
- Automatic position persistence

### Map Integration
- Each card is linked to a map marker via latitude/longitude
- Updating card coordinates updates the marker
- Clicking markers highlights associated cards

### State Management
- Centralized Zustand store
- Automatic localStorage sync
- Import/Export JSON support

### UI/UX
- Responsive design
- Dark/Light mode
- Context menus
- Properties panel for editing
- Sidebar for navigation and search

## Roadmap

- [ ] Undo/Redo functionality
- [ ] Collaborative real-time updates (WebSocket)
- [ ] Advanced charting options
- [ ] Custom color picker
- [ ] Icon customization
- [ ] Advanced search and filtering
- [ ] Team collaboration features
- [ ] Backend integration (Firebase/API)
- [ ] Mobile responsive improvements

## License

MIT
