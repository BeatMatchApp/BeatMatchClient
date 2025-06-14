import React from 'react';
import {Box, IconButton, Stack} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Playlist } from '../../models/Playlist.ts';
import ShinyCard from '../ShinyCard/ShinyCard.tsx';
import {
  PlaylistAvatar,
  PlaylistMetaText,
  PlaylistTitle,
  PlaylistDescriptionText, StyledPlaylistChip, PlaylistDateText,
} from '../styledComponents.tsx';
import SpotifyIcon from "../../../public/assets/images/spotifyIcon.png";

interface PlaylistItemProps {
  playlist: Playlist;
  onView: (playlist: Playlist) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  playlist,
  onView,
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
              <StyledPlaylistChip
                  label={playlist.mood}
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 1, marginBottom: 1 }}/>

              <PlaylistMetaText variant="body2" color="text.secondary">
                <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <PlaylistDateText variant="body2" color="text.secondary" >{formattedDate}</PlaylistDateText>
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
                  <IconButton onClick={handleOpenInSpotify} sx={{ color: '#1DB954' }}>
                    <img
                        src={SpotifyIcon}
                        alt="Spotify"
                        style={{ width: 30, height: 30 }}
                    />
                  </IconButton>
              )}
            </Box>
          </Box>
        </ShinyCard>
      </Box>
  );
};

export default PlaylistItem;