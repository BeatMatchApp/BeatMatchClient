import React from 'react';
import { Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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
} from '../styledComponents.tsx';

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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {onEdit && (
              <ActionIconButton onClick={() => onEdit(playlist)}>
                <EditIcon />
              </ActionIconButton>
            )}
          </Box>
        </Box>
      </ShinyCard>
    </Box>
  );
};

export default PlaylistItem;
