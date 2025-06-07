import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Skeleton,
  Card,
  CardContent,
  Stack,
  Divider,
} from '@mui/material';
import {
  StyledContentContainer,
  StyledPageTitle,
} from '../../components/styledComponents';
import PlaylistItem from '../../components/playlistViews/PlaylistItem';
import PlaylistDetails from '../../components/playlistViews/PlaylistDetails';
import { Playlist } from '../../models/Playlist.ts';
import { playlistService } from '../../services/playlistService';

const LibraryPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await playlistService.getUserPlaylists();
        setPlaylists(data);
      } catch {
        setError('Failed to fetch playlists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const handleCloseDetailView = () => {
    setSelectedPlaylist(null);
  };

  const PlaylistSkeletons = useMemo(
    () => (
      <Box sx={{ display: 'grid', gap: 2, width: '90vw' }}>
        <StyledPageTitle>Your library</StyledPageTitle>
        <Divider sx={{ margin: '10px', width: '100%' }} />
        {[1, 2, 3].map((index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 2,
              transition: 'all 0.3s',
              '&:hover': { transform: 'translateY(-4px)' },
            }}
          >
            <CardContent sx={{ display: 'flex' }}>
              <Skeleton
                variant="rounded"
                width={80}
                height={80}
                sx={{ mr: 2 }}
              />
              <Box sx={{ width: '100%' }}>
                <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
                <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                  <Skeleton variant="text" width={100} height={24} />
                </Stack>
                <Skeleton variant="text" width="70%" />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    ),
    []
  );

  const errorAlert = useMemo(
    () =>
      error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            mb: 3,
            borderRadius: 2,
            '& .MuiAlert-icon': { color: '#f44336' },
          }}
        >
          {error}
        </Alert>
      ),
    [error]
  );
  const playlistsList = useMemo(
    () => (
      <Box className="center">
        <StyledPageTitle sx={{ marginBottom: '1vh' }}>
          Your library
        </StyledPageTitle>
        <Divider sx={{ margin: '10px', width: '100%' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {playlists.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                onView={() => setSelectedPlaylist(playlist)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    ),
    [playlists]
  );

  const emptyState = useMemo(
    () => (
      <Paper
        elevation={1}
        sx={{
          p: 6,
          borderRadius: 3,
          backgroundColor: '#f8f8ff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="#5a36a1" gutterBottom>
          No playlists yet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create your first playlist to get started!
        </Typography>
      </Paper>
    ),
    []
  );

  return (
    <Box className="center" sx={{ width: { sm: '80%' }, margin: 'auto' }}>
      {errorAlert}

      <StyledContentContainer>
        {selectedPlaylist ? (
          <PlaylistDetails
            playlist={selectedPlaylist}
            onBack={handleCloseDetailView}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              justifyContent: 'center',
              display: 'flex',
              height: '90%',
            }}
          >
            {loading
              ? PlaylistSkeletons
              : playlists.length === 0
              ? emptyState
              : playlistsList}
          </Box>
        )}
      </StyledContentContainer>
    </Box>
  );
};

export default LibraryPage;
