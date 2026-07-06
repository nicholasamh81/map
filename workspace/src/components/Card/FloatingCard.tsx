import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { Card } from '@/models/types';
import useWorkspaceStore from '@/store/workspaceStore';

interface FloatingCardProps {
  card: Card;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ card }) => {
  const { updateCard, deleteCard, duplicateCard, selectObject } = useWorkspaceStore();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDelete = () => {
    deleteCard(card.id);
    handleMenuClose();
  };

  const handleDuplicate = () => {
    duplicateCard(card.id);
    handleMenuClose();
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-prevent-drag]')) {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - card.position.x,
      y: e.clientY - card.position.y,
    });
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updateCard(card.id, {
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
        onClick={() => selectObject(card.id, 'card')}
        sx={{
          position: 'absolute',
          left: card.position.x,
          top: card.position.y,
          width: 300,
          backgroundColor: card.color,
          borderColor: card.borderColor,
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 2,
          p: 2,
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {card.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Lat: {card.latitude.toFixed(4)}, Lng: {card.longitude.toFixed(4)}
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleMenuOpen} data-prevent-drag>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Description */}
        {card.description && (
          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            {card.description}
          </Typography>
        )}

        {/* Remarks */}
        {card.remarks && (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {card.remarks}
          </Typography>
        )}
      </Paper>

      {/* Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleDuplicate}>
          <CopyIcon sx={{ mr: 1 }} /> Duplicate
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default FloatingCard;
