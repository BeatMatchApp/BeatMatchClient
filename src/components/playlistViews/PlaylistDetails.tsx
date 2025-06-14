import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import { Playlist, Song } from '../../models/Playlist.ts';
import {
  StyledPageSubtitle,
  PlaylistTitle,
  PlaylistDataTitle,
  PlaylistDataText,
  StyledRefreshButton,
  PlaylistDataBox,
  StyledSaveChangesButton,
  StyledMenuButton,
  StyledIconButton,
} from '../styledComponents';
import ShinyCard from '../ShinyCard/ShinyCard.tsx';
import { SongResult } from '../createPlaylistResults/songResult.tsx';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import './playlistDetails.css';
import { pinkColor } from '../../styles/colors.ts';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Loader from '../Loader/Loader.tsx';
import { refreshAiPlaylist } from '../../services/aiService.ts';
import { playlistService } from '../../services/playlistService.ts';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import ChatDialog from '../chatDialog/chatDialog.tsx';

interface PlaylistDetailsProps {
  playlistId: string;
  playlistSpotifyId: string;
  onBack: () => void;
  onDelete: (playlistId: string) => void;
  onEdit?: (playlist: Playlist) => void;
}

const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({
  playlistId,
  playlistSpotifyId,
  onBack,
  onDelete,
  onEdit,
}) => {
  const [dislikedSongs, setDislikedSongs] = useState<Set<number>>(new Set());
  const [requestText, setRequestText] = useState('');
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [refreshedSongs, setRefreshedSongs] = useState<Array<any> | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentSongs = refreshedSongs || currentPlaylist?.songs || [];
  const isAllSongDisliked = dislikedSongs.size === currentSongs.length;
  const creationDate = currentPlaylist
    ? new Date(currentPlaylist.creationDate).toLocaleDateString()
    : '';

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        if (playlistId) {
          const fetchedPlaylist = await playlistService.getPlaylistById(
            playlistId
          );
          if (fetchedPlaylist) {
            setCurrentPlaylist(fetchedPlaylist);
          } else {
            setError('Playlist not found');
          }
        } else {
          setError('No playlist ID provided');
        }
      } catch (error) {
        console.log('Error fetching playlist details:', error);
        setError('Failed to load playlist. It may have been deleted.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

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
        playlistId,
        playlistSpotifyId
      );

      if (deletedPlaylist) {
        toast.success('Successfully deleted your playlist');
        onDelete(playlistId);
        onBack();
      }
    } catch (error) {
      console.error('Error updating playlist:', error);
      toast.error('Failed to delete your playlist');
    } finally {
      setIsDeleting(false);
      toggleDeleteDialog();
    }
  };

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

  const handleRefresh = async () => {
    if (dislikedSongs.size === 0 && !requestText.trim()) return;
    if (!currentPlaylist) return;

    setIsRefreshing(true);
    try {
      const songsForRefresh = currentSongs.map((song, index) => ({
        name: song.name,
        artist: song.artist,
        trackUri: song.trackUri,
        isReplace: dislikedSongs.has(index),
      }));

      const response = await refreshAiPlaylist({
        mood: currentPlaylist.mood || '',
        event: currentPlaylist.event || '',
        songs: songsForRefresh,
        requestChangesText: requestText,
      });

      if (response?.updatedPlaylist?.data) {
        const updatedSongs = response.updatedPlaylist.data.map(
          (song: Song, index: number) => ({
            id: index,
            name: song.name,
            artist: song.artist,
            trackUri: song.trackUri,
          })
        );
        setRefreshedSongs(updatedSongs);
        setDislikedSongs(new Set());
        setRequestText('');
      }
    } catch (error) {
      console.error('Error refreshing playlist:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const markAllForDisliked = () => {
    setDislikedSongs(new Set(currentSongs.map((_, index) => index)));
    setIsRefreshDisabled(false);
  };

  const removeAllFromDisliked = () => {
    setDislikedSongs(new Set());
    setIsRefreshDisabled(!requestText.trim());
  };

  const handleSaveClick = () => {
    setSaveDialogOpen(true);
  };

  const handleSaveConfirm = async () => {
    if (!refreshedSongs || !currentPlaylist) return;

    setIsSaving(true);
    try {
      const updatedPlaylist = await playlistService.updatePlaylist(
        currentPlaylist.id,
        {
          songs: refreshedSongs.map((song) => ({
            name: song.name,
            artist: song.artist,
            trackUri: song.trackUri,
          })),
        }
      );

      setRefreshedSongs(null);
      setCurrentPlaylist(updatedPlaylist);
    } catch (error) {
      console.error('Error updating playlist:', error);
    } finally {
      setIsSaving(false);
      setSaveDialogOpen(false);
    }
  };

  const handleSaveCancel = () => {
    setSaveDialogOpen(false);
  };

  if (loading) {
    return <Loader />;
  }
  if (error || !currentPlaylist) {
    return (
      <Box className={'center'} sx={{ height: '50vh' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#ff5252' }}>
          {error || 'Playlist not found'}
        </Typography>
        <StyledMenuButton
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Playlists
        </StyledMenuButton>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          mb: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={onBack} sx={{ mr: 1, color: '#715cf8' }}>
            <ArrowBackIcon />
          </IconButton>
          <PlaylistTitle variant="h6">{currentPlaylist.name}</PlaylistTitle>
        </Box>
        <StyledIconButton size="small" onClick={(e) => openDeleteDialog(e)}>
          <DeleteIcon
            fontSize="medium"
            sx={{
              color: (theme) => theme.palette.customColors.medium,
              paddingLeft: '6px',
            }}
          />
        </StyledIconButton>
        {onEdit && (
          <IconButton
            onClick={() => onEdit(currentPlaylist)}
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
            <PlaylistDataBox>
              <PlaylistDataTitle> created: </PlaylistDataTitle>
              <PlaylistDataText>{creationDate}</PlaylistDataText>
            </PlaylistDataBox>
            <PlaylistDataBox>
              <PlaylistDataText>
                {currentPlaylist.songs.length} songs
              </PlaylistDataText>
            </PlaylistDataBox>
          </Box>
        </ShinyCard>
      </Box>

      {currentSongs.length === 0 ? (
        <StyledPageSubtitle>
          This playlist doesn't have any songs.
        </StyledPageSubtitle>
      ) : (
        <>
          <Box
            className="center"
            sx={{
              paddingBottom: '1vh',
              boxShadow: 'rgba(0, 0, 0, 0.45) 0px 12px 20px -20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              className="playlist-actions"
              style={{ width: '100%', position: 'relative' }}
            >
              <Box sx={{ position: 'absolute', left: '0' }}>
                <ChatDialog
                  requestText={requestText}
                  setRequestText={setRequestText}
                />
              </Box>
              <Box
                sx={{
                  width: '200px',
                  display: 'flex',
                }}
              >
                {refreshedSongs ? (
                  <>
                    <StyledRefreshButton
                      disabled={isRefreshDisabled || isRefreshing}
                      onClick={handleRefresh}
                      startIcon={<RefreshIcon />}
                      sx={{
                        flex: '1',
                        marginRight: '6px',
                      }}
                    >
                      Refresh
                    </StyledRefreshButton>
                    <StyledSaveChangesButton
                      onClick={handleSaveClick}
                      startIcon={<SaveIcon />}
                      sx={{
                        flex: '1',
                      }}
                    >
                      Save
                    </StyledSaveChangesButton>
                  </>
                ) : (
                  <StyledRefreshButton
                    disabled={isRefreshDisabled || isRefreshing}
                    onClick={handleRefresh}
                    startIcon={<RefreshIcon />}
                    sx={{ width: '100%' }}
                  >
                    Refresh
                  </StyledRefreshButton>
                )}
              </Box>
              <IconButton
                onClick={
                  isAllSongDisliked ? removeAllFromDisliked : markAllForDisliked
                }
                disabled={isRefreshing}
                sx={{
                  border: `1px solid ${pinkColor}`,
                  color: pinkColor,
                  height: '40px',
                  width: '40px',
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {isAllSongDisliked ? (
                  <PlaylistRemoveIcon />
                ) : (
                  <PlaylistAddCheckIcon />
                )}
              </IconButton>
            </div>
          </Box>

          <Box
            sx={{
              height: '50vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              maxwidth: '450px',
            }}
          >
            {isRefreshing ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Loader />
              </Box>
            ) : (
              currentSongs.map((song, index) => (
                <Box className="center" sx={{ margin: '1vh' }} key={index}>
                  <SongResult
                    key={index}
                    isDisliked={dislikedSongs.has(index)}
                    song={song}
                    onDislikeChange={() => onDislikeChange(index)}
                  />
                </Box>
              ))
            )}
          </Box>
        </>
      )}
      <Dialog open={saveDialogOpen} onClose={handleSaveCancel}>
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.customColors.textMain,
            textAlign: 'center',
            fontSize: '1.3rem',
            pt: 2,
          }}
        >
          Save Your Changes
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <DialogContentText
            sx={{
              color: (theme) => theme.palette.customColors.textSecondary,
              textAlign: 'center',
              fontSize: '0.95rem',
              mb: 2,
            }}
          >
            Are you sure you want to save the updated playlist? This will
            replace the current songs in your playlist.
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
            onClick={handleSaveCancel}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              padding: '8px 20px',
              fontWeight: 500,
              color: '#6c757d',
              border: '1px solid #dee2e6',
            }}
            disabled={isSaving}
          >
            Cancel
          </StyledMenuButton>

          <StyledMenuButton
            onClick={handleSaveConfirm}
            autoFocus
            variant="contained"
            disabled={isSaving}
            startIcon={
              isSaving ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              padding: '8px 24px',
              fontWeight: 500,
            }}
          >
            {isSaving ? 'Saving...' : 'Save Playlist'}
          </StyledMenuButton>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={toggleDeleteDialog}>
        <DialogContent sx={{ px: 3 }}>
          <DialogContentText
            sx={{
              color: (theme) => theme.palette.customColors.textSecondary,
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

export default PlaylistDetails;
