import React from 'react';
import { Box, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LaunchIcon from '@mui/icons-material/Launch';
import { Playlist } from '../../models/Playlist.ts';
import ShinyCard from '../ShinyCard/ShinyCard.tsx';
import {
  PlaylistAvatar,
  PlaylistMetaText,
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

  const handleOpenInSpotify = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.url) {
      window.open(playlist.url, '_blank');
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

            <Box sx={{ flexGrow: 1, textAlign: 'start', overflow: 'hidden' }}>
              <PlaylistTitle
                  variant="h6"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
              >
                {playlist.name}
              </PlaylistTitle>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 1 }}
            >
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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {playlist.url && (
                    <ActionIconButton
                        onClick={handleOpenInSpotify}
                        sx={{
                          backgroundColor: '#1DB954',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#1AA34A',
                          }
                        }}
                    >
                      <LaunchIcon fontSize="small" />
                    </ActionIconButton>
              )}

              {onEdit && (
                  <Tooltip title="Edit playlist">
                    <ActionIconButton onClick={(e) => {
                      e.stopPropagation();
                      onEdit(playlist);
                    }}>
                      <EditIcon />
                    </ActionIconButton>
                  </Tooltip>
              )}
            </Box>
          </Box>
        </ShinyCard>
      </Box>
  );
};

export default PlaylistItem;