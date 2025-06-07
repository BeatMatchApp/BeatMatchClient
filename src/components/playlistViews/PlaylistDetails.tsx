import React, { useState } from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Playlist } from '../../models/Playlist.ts';
import {
  StyledPageSubtitle,
  PlaylistTitle,
  PlaylistDataTitle,
  PlaylistDataText,
  StyledRefreshButton,
  StyledTextArea,
} from '../styledComponents';
import ShinyCard from '../ShinyCard/ShinyCard.tsx';
import { SongResult } from '../createPlaylistResults/songResult.tsx';

interface PlaylistDetailsProps {
  playlist: Playlist;
  onBack: () => void;
  onEdit?: (playlist: Playlist) => void;
}

const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({
  playlist,
  onBack,
  onEdit,
}) => {
  const [dislikedSongs, setDislikedSongs] = useState<Set<number>>(new Set());
  const [requestText, setRequestText] = useState('');
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(true);

  const creationDate = new Date(playlist.creationTime).toLocaleDateString();
  const lastUpdated = new Date(playlist.lastUpdatedTime).toLocaleDateString();

  const onDislikeChange = (id: number) => {
    setDislikedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      setIsRefreshDisabled(newSet.size === 0 && !requestText.trim());
      return newSet;
    });
  };

  const handleRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRequestText(value);
    setIsRefreshDisabled(value.trim().length === 0 && dislikedSongs.size === 0);
  };

  const handleRefresh = () => {
    console.log('Disliked songs:', dislikedSongs);
    console.log('Request text:', requestText);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={onBack} sx={{ mr: 1, color: '#715cf8' }}>
          <ArrowBackIcon />
        </IconButton>
        <PlaylistTitle variant="h6">{playlist.name}</PlaylistTitle>
        {onEdit && (
          <IconButton
            onClick={() => onEdit(playlist)}
            sx={{ ml: 'auto', color: '#715cf8' }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{ justifyContent: 'center', display: 'flex', marginBottom: '1vh' }}
      >
        <ShinyCard colors={['#8d92f6', '#a2dfd0']}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PlaylistDataTitle> created: </PlaylistDataTitle>
              <PlaylistDataText>{creationDate}</PlaylistDataText>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PlaylistDataTitle> Last Updated: </PlaylistDataTitle>
              <PlaylistDataText>{lastUpdated}</PlaylistDataText>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PlaylistDataTitle> Number of Songs: </PlaylistDataTitle>
              <PlaylistDataText>{playlist.songs.length}</PlaylistDataText>
            </Box>

            {playlist.context && (
              <Box>
                <Divider sx={{ margin: '5px' }} />
                <PlaylistDataTitle>Playlist Context:</PlaylistDataTitle>
                <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>
                  {playlist.context}
                </Typography>
              </Box>
            )}
          </Box>
        </ShinyCard>
      </Box>

      {playlist.songs.length === 0 ? (
        <StyledPageSubtitle>
          This playlist doesn't have any songs.
        </StyledPageSubtitle>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <StyledPageSubtitle sx={{ fontWeight: 'bold' }}>
              Songs
            </StyledPageSubtitle>
            <StyledRefreshButton
              disabled={isRefreshDisabled}
              onClick={handleRefresh}
              size="small"
              startIcon={<RefreshIcon />}
            >
              Refresh
            </StyledRefreshButton>
          </Box>

          <Box sx={{ overflow: 'hidden', height: '30vh' }}>
            <Box
              sx={{
                mb: '1vh',
                justifySelf: 'center',
                width: '100%',
                height: '100%',
                overflowY: 'scroll',
                padding: '0 1.5vw 1vh 1vh',
              }}
            >
              {playlist.songs.map((song, index) => (
                <Box className="center" sx={{ margin: '1vh' }} key={index}>
                  <SongResult
                    key={index}
                    isDisliked={dislikedSongs.has(index)}
                    trackDetails={song}
                    onDislikeChange={() => onDislikeChange(index)}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <StyledTextArea
            minRows={4}
            placeholder="Add song requests or feedback for this playlist..."
            onChange={() => handleRequestChange}
          />
        </>
      )}
    </Box>
  );
};

export default PlaylistDetails;
