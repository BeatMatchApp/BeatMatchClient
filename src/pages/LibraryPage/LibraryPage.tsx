import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Alert,
  Skeleton,
  Card,
  CardContent,
  Stack,
  Divider,
  Modal,
} from '@mui/material';
import {
  StyledContentContainer,
  StyledMenuButton,
  StyledPageSubtitle,
  StyledPageTitle,
} from '../../components/styledComponents';
import PlaylistItem from '../../components/playlistViews/PlaylistItem';
import PlaylistDetails from '../../components/playlistViews/PlaylistDetails';
import { Playlist } from '../../models/Playlist.ts';
import { playlistService } from '../../services/playlistService';
import MoodPlaylistsChart from '../../components/moodBoard/moodBoard.tsx';

const LibraryPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMoodsModalOpen, setIsMoodsModalOpen] = useState<boolean>(false);
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

  const handleDeletePlaylist = (playlistId: string): void => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist: Playlist) => playlist.id !== playlistId)
    );
  };

  const playlistMoods: Pick<Playlist, 'id' | 'mood'>[] = useMemo(() => {
    return playlists.map((playlist: Playlist) => {
      return {
        id: playlist.id,
        mood: playlist.mood ? playlist.mood : 'no mood',
      };
    });
  }, [playlists]);

  const toggleMoodsModal = (): void => {
    setIsMoodsModalOpen((prev) => !prev);
  };

  const PlaylistSkeletons = useMemo(
    () => (
      <Box sx={{ display: 'grid', width: { xs: '90vw', sm: '50vw' } }}>
        <StyledPageTitle sx={{ marginBottom: '1vh' }}>
          Your library
        </StyledPageTitle>
        <Divider sx={{ margin: '10px', width: '100%' }} />
        <Box sx={{ display: 'grid', gap: '2vh' }}>
          {[1, 2, 3].map((index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
            >
              <CardContent sx={{ display: 'flex', padding: '1vh !important' }}>
                <Skeleton
                  variant="rounded"
                  width={100}
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
        <Box sx={{ width: '100%' }}>
          <StyledPageTitle sx={{ marginBottom: '1vh' }}>
            Your library
          </StyledPageTitle>
          <Divider sx={{ margin: '10px', width: '100%' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: '2vh',
              overflowY: 'auto',
              maxHeight: '72vh',
              pr: 1,
            }}
          >
            {playlists.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                onView={() => setSelectedPlaylist(playlist)}
                onDelete={handleDeletePlaylist}
              />
            ))}
          </Box>
          <Modal
            open={isMoodsModalOpen}
            onClose={toggleMoodsModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: 5,
                width: { xs: '90%', sm: '60%', md: '40%' },
                overflowY: 'auto',
                backgroundColor: '#e0f3ff',
              }}
            >
              <MoodPlaylistsChart playlists={playlistMoods} />
            </Box>
          </Modal>
          <Box className="center" sx={{ mt: '10px' }}>
            <StyledMenuButton variant="contained" onClick={toggleMoodsModal}>
              discover my mood board
            </StyledMenuButton>
          </Box>
        </Box>
      </Box>
    ),
    [playlists, isMoodsModalOpen]
  );

  const emptyState = useMemo(
    () => (
      <Box className="center" sx={{ marginTop: '5vh' }}>
        <StyledPageTitle>No playlists yet</StyledPageTitle>
        <StyledPageSubtitle variant="body1" color="text.secondary">
          Create your first playlist to get started!
        </StyledPageSubtitle>
      </Box>
    ),
    []
  );

  const libraryContent = () => {
    if (loading) return PlaylistSkeletons;
    if (playlists.length === 0) return emptyState;
    return playlistsList;
  };

  return (
    <Box className="center" sx={{ width: { sm: '80%' }, margin: 'auto' }}>
      {errorAlert}

      <StyledContentContainer>
        {selectedPlaylist ? (
          <PlaylistDetails
            playlistId={selectedPlaylist.id}
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
            {libraryContent()}
          </Box>
        )}
      </StyledContentContainer>
    </Box>
  );
};

export default LibraryPage;
