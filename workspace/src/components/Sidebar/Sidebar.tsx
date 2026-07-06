import React, { useState } from 'react';
import {
  Box,
  Drawer,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import useWorkspaceStore from '@/store/workspaceStore';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const {
    wallets,
    layers,
    cards,
    createWallet,
    createLayer,
    createCard,
    deleteWallet,
    deleteLayer,
    selectObject,
  } = useWorkspaceStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [createWalletDialogOpen, setCreateWalletDialogOpen] = useState(false);
  const [createLayerDialogOpen, setCreateLayerDialogOpen] = useState(false);
  const [createCardDialogOpen, setCreateCardDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedWalletForCard, setSelectedWalletForCard] = useState<string | null>(null);

  const walletList = Array.from(wallets.values());
  const layerList = Array.from(layers.values());
  const cardList = Array.from(cards.values()).filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateWallet = () => {
    if (newName.trim()) {
      createWallet(newName);
      setNewName('');
      setCreateWalletDialogOpen(false);
    }
  };

  const handleCreateLayer = () => {
    if (newName.trim()) {
      createLayer(newName);
      setNewName('');
      setCreateLayerDialogOpen(false);
    }
  };

  const handleCreateCard = () => {
    if (selectedWalletForCard && newName.trim()) {
      createCard(selectedWalletForCard, { title: newName });
      setNewName('');
      setSelectedWalletForCard(null);
      setCreateCardDialogOpen(false);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          zIndex: 50,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Workspace
        </Typography>

        {/* Wallets Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Wallets
            </Typography>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setCreateWalletDialogOpen(true)}
            >
              Add
            </Button>
          </Box>
          <List sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
            {walletList.length > 0 ? (
              walletList.map((wallet) => (
                <ListItem
                  key={wallet.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => deleteWallet(wallet.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton onClick={() => selectObject(wallet.id, 'wallet')}>
                    <ListItemText primary={wallet.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="caption" sx={{ color: 'text.secondary', p: 1 }}>
                No wallets yet
              </Typography>
            )}
          </List>
        </Box>

        <Divider />

        {/* Layers Section */}
        <Box sx={{ my: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Layers
            </Typography>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setCreateLayerDialogOpen(true)}
            >
              Add
            </Button>
          </Box>
          <List sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
            {layerList.length > 0 ? (
              layerList.map((layer) => (
                <ListItem
                  key={layer.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => deleteLayer(layer.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton onClick={() => selectObject(layer.id, 'layer')}>
                    <ListItemText primary={layer.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="caption" sx={{ color: 'text.secondary', p: 1 }}>
                No layers yet
              </Typography>
            )}
          </List>
        </Box>

        <Divider />

        {/* Cards Section */}
        <Box sx={{ my: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Cards
            </Typography>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setCreateCardDialogOpen(true)}
            >
              Add
            </Button>
          </Box>
          <TextField
            size="small"
            placeholder="Search cards..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 1 }}
          />
          <List sx={{ bgcolor: 'background.default', borderRadius: 1, maxHeight: 300, overflow: 'auto' }}>
            {cardList.length > 0 ? (
              cardList.map((card) => (
                <ListItem key={card.id} disablePadding>
                  <ListItemButton onClick={() => selectObject(card.id, 'card')}>
                    <ListItemText primary={card.title} secondary={`Lat: ${card.latitude}, Lng: ${card.longitude}`} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="caption" sx={{ color: 'text.secondary', p: 1 }}>
                No cards found
              </Typography>
            )}
          </List>
        </Box>
      </Box>

      {/* Create Wallet Dialog */}
      <Dialog open={createWalletDialogOpen} onClose={() => setCreateWalletDialogOpen(false)}>
        <DialogTitle>Create Wallet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Wallet Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateWalletDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateWallet} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Layer Dialog */}
      <Dialog open={createLayerDialogOpen} onClose={() => setCreateLayerDialogOpen(false)}>
        <DialogTitle>Create Layer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Layer Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateLayerDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateLayer} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Card Dialog */}
      <Dialog open={createCardDialogOpen} onClose={() => setCreateCardDialogOpen(false)}>
        <DialogTitle>Create Card</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select Wallet"
            fullWidth
            value={selectedWalletForCard || ''}
            onChange={(e) => setSelectedWalletForCard(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            {walletList.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </TextField>
          <TextField
            autoFocus
            label="Card Title"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateCardDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateCard}
            variant="contained"
            disabled={!selectedWalletForCard || !newName.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
