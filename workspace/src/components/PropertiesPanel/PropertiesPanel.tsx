import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  ColorPicker,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import useWorkspaceStore from '@/store/workspaceStore';

const PropertiesPanel: React.FC = () => {
  const {
    selectedPropertyPanel,
    workspaceState,
    cards,
    wallets,
    layers,
    updateCard,
    updateWallet,
    updateLayer,
    deselectObject,
  } = useWorkspaceStore();

  const selectedId = workspaceState.selectedObjectId;
  const selectedType = workspaceState.selectedObjectType;

  if (!selectedId || !selectedType) {
    return null;
  }

  const renderWalletProperties = () => {
    const wallet = wallets.get(selectedId);
    if (!wallet) return null;

    return (
      <Stack spacing={2}>
        <TextField
          label="Wallet Name"
          fullWidth
          value={wallet.name}
          onChange={(e) => updateWallet(selectedId, { name: e.target.value })}
        />
        <Box>
          <Typography variant="caption">Color</Typography>
          <Box
            sx={{
              width: '100%',
              height: 40,
              backgroundColor: wallet.color,
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
            onClick={() => {
              // Open color picker
            }}
          />
        </Box>
        <Box>
          <Typography variant="caption">Border Color</Typography>
          <Box
            sx={{
              width: '100%',
              height: 40,
              backgroundColor: wallet.borderColor,
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
          />
        </Box>
      </Stack>
    );
  };

  const renderCardProperties = () => {
    const card = cards.get(selectedId);
    if (!card) return null;

    return (
      <Stack spacing={2}>
        <TextField
          label="Title"
          fullWidth
          value={card.title}
          onChange={(e) => updateCard(selectedId, { title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={card.description}
          onChange={(e) => updateCard(selectedId, { description: e.target.value })}
        />
        <TextField
          label="Remarks"
          fullWidth
          multiline
          rows={2}
          value={card.remarks}
          onChange={(e) => updateCard(selectedId, { remarks: e.target.value })}
        />
        <TextField
          label="Latitude"
          type="number"
          fullWidth
          value={card.latitude}
          onChange={(e) =>
            updateCard(selectedId, { latitude: parseFloat(e.target.value) })
          }
        />
        <TextField
          label="Longitude"
          type="number"
          fullWidth
          value={card.longitude}
          onChange={(e) =>
            updateCard(selectedId, { longitude: parseFloat(e.target.value) })
          }
        />
        <Box>
          <Typography variant="caption">Color</Typography>
          <Box
            sx={{
              width: '100%',
              height: 40,
              backgroundColor: card.color,
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
          />
        </Box>
      </Stack>
    );
  };

  const renderLayerProperties = () => {
    const layer = layers.get(selectedId);
    if (!layer) return null;

    return (
      <Stack spacing={2}>
        <TextField
          label="Layer Name"
          fullWidth
          value={layer.name}
          onChange={(e) => updateLayer(selectedId, { name: e.target.value })}
        />
        <Box>
          <Typography variant="caption">Icon Color</Typography>
          <Box
            sx={{
              width: '100%',
              height: 40,
              backgroundColor: layer.iconColor,
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
          />
        </Box>
        <Typography variant="subtitle2">Linked Cards: {layer.cardIds.length}</Typography>
      </Stack>
    );
  };

  return (
    <Drawer
      anchor="right"
      variant="persistent"
      open={Boolean(selectedId && selectedType)}
      sx={{
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderLeft: 1,
          borderColor: 'divider',
          zIndex: 50,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Properties
          </Typography>
          <IconButton size="small" onClick={deselectObject}>
            <CloseIcon />
          </IconButton>
        </Box>

        {selectedType === 'wallet' && renderWalletProperties()}
        {selectedType === 'card' && renderCardProperties()}
        {selectedType === 'layer' && renderLayerProperties()}
      </Box>
    </Drawer>
  );
};

export default PropertiesPanel;
