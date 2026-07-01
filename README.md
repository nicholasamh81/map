# Workspace Map Application

A modern, interactive workspace application built with React, TypeScript, and Tailwind CSS. This application allows users to create, manage, and visualize wallets, cards, and layers with an integrated map interface.

## Features

- **Interactive Map**: Leaflet-based map with OpenStreetMap tiles
- **Wallet Management**: Create, edit, and organize wallets with draggable windows
- **Card System**: Add cards to wallets with location data (latitude/longitude)
- **Layer Management**: Organize cards into layers with visibility and lock controls
- **Data Visualization**: Support for charts (line, bar, pie, area) and tables
- **Dark Mode**: Full dark mode support with smooth transitions
- **Data Persistence**: Export/import data as JSON files
- **Responsive Design**: Tailwind CSS for modern, responsive UI
- **Type Safety**: Full TypeScript support throughout the application

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with shadcn/ui patterns
- **Map Library**: Leaflet with React-Leaflet
- **Data Visualization**: Recharts
- **Table Management**: TanStack Table (React Table)
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Build Tool**: Vite
- **Linting**: ESLint

## Project Structure

```
src/
├── components/
│   ├── Layout/              # Main layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PropertiesPanel.tsx
│   │   └── index.tsx
│   ├── UI/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── Wallet/              # Wallet-related components
│   │   ├── WalletWindow.tsx
│   │   ├── WalletCardsList.tsx
│   │   └── WalletList.tsx
│   ├── Card/                # Card-related components
│   │   ├── CardItem.tsx
│   │   └── CardDetails.tsx
│   ├── Map/                 # Map components
│   │   └── MapWindow.tsx
│   ├── Chart/               # Chart and table components
│   │   ├── ChartViewer.tsx
│   │   └── TableViewer.tsx
│   ├── Layer/               # Layer components
│   │   └── LayerList.tsx
│   └── Workspace/           # Workspace container
│       └── index.tsx
├── store/
│   └── index.ts             # Zustand store with all state management
├── services/
│   └── storage.ts           # LocalStorage and file handling
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nicholasamh81/map.git
cd map
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

### Creating a Wallet
1. Click the "+" button in the Wallets section of the sidebar
2. A new wallet window will appear in the workspace
3. Click on the wallet to select it and edit properties in the Properties Panel

### Adding Cards
1. Select a wallet window
2. Click "Add Card" button inside the wallet
3. Edit card properties (title, description, location) in the Properties Panel

### Managing Layers
1. Create layers from the "Layers" section in the sidebar
2. Cards belong to layers for organizational purposes
3. Toggle layer visibility and lock status with the eye and lock icons

### Using the Map
1. The map displays all visible cards as circle markers
2. Click markers to select cards
3. Zoom and pan the map to explore different areas
4. Selected markers are highlighted in blue

### Adding Data Visualizations
1. Select a card from the workspace
2. In the Properties Panel, click "Add Chart" or "Add Table"
3. Choose the visualization type and configure the data
4. Charts support: Line, Bar, Pie, and Area charts

### Dark Mode
1. Click the moon/sun icon in the header to toggle dark mode
2. Preference is saved to local storage

### Data Export/Import
1. **Export**: Click the download icon in the header to save all data as JSON
2. **Import**: Click the upload icon and select a previously exported JSON file
3. **Clear All**: Click the trash icon to clear all data (irreversible)

## State Management

The application uses Zustand for state management. The store includes:

- **UI State**: Dark mode, selected items, etc.
- **Entities**: Wallets, Cards, Layers, and their relationships
- **Map State**: Center coordinates and zoom level
- **Actions**: CRUD operations for all entities
- **Persistence**: Export/import functionality

## Component Architecture

### Layout Components
- **Header**: Navigation and global controls
- **Sidebar**: Wallet and Layer management
- **PropertiesPanel**: Edit properties of selected items
- **Workspace**: Canvas for draggable windows and map

### Feature Components
- **WalletWindow**: Draggable and resizable wallet container
- **MapWindow**: Leaflet map with card markers
- **ChartViewer**: Recharts-based visualization
- **TableViewer**: TanStack Table for data display

## Styling

The application uses Tailwind CSS with:
- Custom color scheme (blue primary, slate for secondary)
- Dark mode support with `dark:` variants
- Responsive breakpoints
- Custom animations and transitions
- Accessible focus states and interactions

## ESLint Configuration

The project includes ESLint with React and TypeScript rules:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Future Enhancements

- [ ] Undo/Redo functionality
- [ ] Collaborative editing
- [ ] Advanced filtering and search
- [ ] Custom map tiles and styling
- [ ] Data synchronization with backend
- [ ] Mobile app version
- [ ] Advanced analytics and reporting
- [ ] Template system for cards and wallets

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push and create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please create an issue on GitHub.
