import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import Map from '@/components/Map/Map';
import Sidebar from '@/components/Sidebar/Sidebar';
import PropertiesPanel from '@/components/PropertiesPanel/PropertiesPanel';
import FloatingWallet from '@/components/Wallet/FloatingWallet';
import FloatingCard from '@/components/Card/FloatingCard';
import useWorkspaceStore from '@/store/workspaceStore';
import './Workspace.css';

const Workspace: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    showSidebar,
    toggleSidebar,
    wallets,
    cards,
    setZoom,
    workspaceState,
    saveToLocalStorage,
  } = useWorkspaceStore();

  const workspaceRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Auto-save on changes
    const saveInterval = setInterval(() => {
      saveToLocalStorage();
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [saveToLocalStorage]);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976D2',
      },
      secondary: {
        main: '#FF9800',
      },
      background: {
        default: isDarkMode ? '#121212' : '#FAFAFA',
        paper: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(workspaceState.zoom + zoomDelta);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      // Right click for panning
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && workspaceRef.current) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      // Implement pan update
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="workspace-container"
        sx={{
          display: 'flex',
          height: '100vh',
          bgcolor: 'background.default',
          overflow: 'hidden',
        }}
      >
        {showSidebar && <Sidebar />}

        <Box
          ref={workspaceRef}
          className="workspace-main"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Map */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
            }}
          >
            <Map />

            {/* Floating Wallets */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              {Array.from(wallets.values()).map((wallet) => (
                <FloatingWallet key={wallet.id} wallet={wallet} />
              ))}
            </Box>

            {/* Floating Cards */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              {Array.from(cards.values()).map((card) => (
                <FloatingCard key={card.id} card={card} />
              ))}
            </Box>
          </Box>

          {/* Properties Panel */}
          <PropertiesPanel />

          {/* Top Toolbar */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1,
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              p: 1,
              boxShadow: 1,
            }}
          >
            <Tooltip title="Toggle Sidebar">
              <IconButton size="small" onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom In">
              <IconButton size="small" onClick={() => setZoom(workspaceState.zoom + 0.2)}>
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
              <IconButton size="small" onClick={() => setZoom(workspaceState.zoom - 0.2)}>
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Theme">
              <IconButton size="small" onClick={toggleDarkMode}>
                {isDarkMode ? <LightIcon /> : <DarkIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton size="small">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Workspace;
