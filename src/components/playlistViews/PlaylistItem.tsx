import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Playlist } from '../../models/Playlist.ts';
import ShinyCard from '../ShinyCard/ShinyCard.tsx';
import {
  PlaylistAvatar,
  PlaylistMetaText,
  StyledPlaylistChip,
  PlaylistTitle,
  ActionIconButton,
  PlaylistDescriptionText,
  StyledIconButton,
  StyledMenuButton,
} from '../styledComponents.tsx';
import { playlistService } from '../../services/playlistService.ts';
import { toast } from 'react-toastify';

interface PlaylistItemProps {
  playlist: Playlist;
  onView: (playlist: Playlist) => void;
  onEdit?: (playlist: Playlist) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  playlist,
  onView,
  onEdit,
}) => {
  const formattedDate = new Date(playlist.lastUpdatedDate).toLocaleDateString();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDeleteDialog = (): void => {
    setIsDeleteDialogOpen((prev) => !prev);
  };

  const openDeleteDialog = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    toggleDeleteDialog();
  };

  const handleDeletePlaylist = async () => {
    setIsDeleting(true);
    try {
      const deletedPlaylist = await playlistService.deletePlaylist(
        playlist.id,
        playlist.spotifyPlaylistId
      );

      if (deletedPlaylist) {
        toast.info('Successfully deleted your playlist');
      }
    } catch (error) {
      console.error('Error updating playlist:', error);
      toast.error('Failed to delete your playlist');
    } finally {
      setIsDeleting(false);
      toggleDeleteDialog();
    }
  };
  return (
    <Box>
      <ShinyCard colors={['#8d92f6', '#a2dfd0']}>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          onClick={() => onView(playlist)}
        >
          <PlaylistAvatar variant="rounded">
            {playlist.imageUrl ? (
              <Box
                component="img"
                src={playlist.imageUrl}
                alt={playlist.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <MusicNoteIcon sx={{ fontSize: 36, color: 'white' }} />
            )}
          </PlaylistAvatar>
          <Box sx={{ flexGrow: 1, textAlign: 'start' }}>
            <PlaylistTitle variant="h6">{playlist.name}</PlaylistTitle>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <StyledPlaylistChip
                size="small"
                label={`${playlist.songs.length} songs`}
              />
              <PlaylistMetaText variant="body2" color="text.secondary">
                <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                {formattedDate}
              </PlaylistMetaText>
            </Stack>

            {playlist.description && (
              <PlaylistDescriptionText variant="body2" color="text.secondary">
                {playlist.description}
              </PlaylistDescriptionText>
            )}
          </Box>
          <StyledIconButton size="small" onClick={(e) => openDeleteDialog(e)}>
            <DeleteIcon
              fontSize="medium"
              sx={{ color: 'grey', paddingLeft: '6px' }}
            />
          </StyledIconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {onEdit && (
              <ActionIconButton onClick={() => onEdit(playlist)}>
                <EditIcon />
              </ActionIconButton>
            )}
          </Box>
        </Box>
      </ShinyCard>

      <Dialog open={isDeleteDialogOpen} onClose={toggleDeleteDialog}>
        <DialogContent sx={{ px: 3 }}>
          <DialogContentText
            sx={{
              color: '#5a5a5a',
              textAlign: 'center',
              fontSize: '0.95rem',
              mb: 2,
            }}
          >
            Are you sure you want to delete the playlist? it will also be
            deleted from your spotify account
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 16px 24px',
            gap: 2,
          }}
        >
          <StyledMenuButton
            variant="outlined"
            onClick={toggleDeleteDialog}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              padding: '8px 20px',
              fontWeight: 500,
              color: '#6c757d',
              border: '1px solid #dee2e6',
            }}
          >
            Cancel
          </StyledMenuButton>

          <StyledMenuButton
            onClick={handleDeletePlaylist}
            autoFocus
            variant="contained"
            startIcon={
              isDeleting ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              padding: '8px 24px',
              fontWeight: 500,
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </StyledMenuButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlaylistItem;
