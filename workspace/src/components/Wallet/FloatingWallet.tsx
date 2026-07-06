import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Wallet } from '@/models/types';
import useWorkspaceStore from '@/store/workspaceStore';

interface FloatingWalletProps {
  wallet: Wallet;
}

const FloatingWallet: React.FC<FloatingWalletProps> = ({ wallet }) => {
  const { updateWallet, deleteWallet, selectObject, cards } = useWorkspaceStore();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(wallet.name);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const walletCards = wallet.cardIds
    .map((id) => cards.get(id))
    .filter(Boolean);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleToggleCollapse = () => {
    updateWallet(wallet.id, { collapsed: !wallet.collapsed });
  };

  const handleDelete = () => {
    deleteWallet(wallet.id);
    handleMenuClose();
  };

  const handleEditOpen = () => {
    setIsEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveName = () => {
    updateWallet(wallet.id, { name: editName });
    handleEditClose();
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-prevent-drag]')) {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - wallet.position.x,
      y: e.clientY - wallet.position.y,
    });
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updateWallet(wallet.id, {
      position: {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      },
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <Paper
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onClick={() => selectObject(wallet.id, 'wallet')}
        sx={{
          position: 'absolute',
          left: wallet.position.x,
          top: wallet.position.y,
          width: 280,
          minHeight: 60,
          backgroundColor: wallet.color,
          borderColor: wallet.borderColor,
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 2,
          p: 1.5,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          pointerEvents: 'auto',
          zIndex: isDragging ? 1001 : 100,
          transition: isDragging ? 'none' : 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.16)',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: wallet.collapsed ? 0 : 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, flex: 1 }}>
              {wallet.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }} data-prevent-drag>
            <IconButton size="small" onClick={handleToggleCollapse}>
              {wallet.collapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </IconButton>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Card List */}
        {!wallet.collapsed && (
          <Box sx={{ mt: 1 }}>
            {walletCards.length > 0 ? (
              <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                {walletCards.map((card) => (
                  <Typography
                    key={card?.id}
                    variant="caption"
                    sx={{
                      display: 'block',
                      p: 0.5,
                      borderRadius: 1,
                      bgcolor: 'rgba(0, 0, 0, 0.05)',
                      mb: 0.5,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    {card?.title}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                No cards yet
              </Typography>
            )}
          </Box>
        )}
      </Paper>

      {/* Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditOpen}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Wallet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Wallet Name"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveName} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FloatingWallet;
