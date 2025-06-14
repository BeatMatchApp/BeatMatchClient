import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import {
  StyledContentContainer,
  StyledGradientChatIcon,
  StyledMenuButton,
  StyledPageTitle,
  StyledRefreshButton,
  StyledTextArea,
} from '../styledComponents';
import { SongResult } from './songResult';
import { useEffect, useMemo, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Song } from '../../models/Playlist.ts';
import { refreshAiPlaylist } from '../../services/aiService.ts';
import Loader from '../Loader/Loader.tsx';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { pinkColor } from '../../styles/colors.ts';
import './createPlaylistResults.css';
import theme from '../../styles/consts.ts';
import ShinyCard from '../ShinyCard/ShinyCard.tsx';
import { Badge } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  songs: Song[];
  loading: boolean;
  mood?: string | null;
  event?: string | null;
  onSongsChange?: (songs: Song[]) => void;
}

export const CreatePlaylistResults: React.FC<Props> = ({
  songs: initialSongs,
  loading: initialLoading,
  mood,
  event,
  onSongsChange,
}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [requestText, setRequestText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dislikedSongs, setDislikedSongs] = useState<Set<number>>(new Set());
  const [dialogText, setDialogText] = useState('');
  const isRefreshDisabled = useMemo(
    () => dislikedSongs.size === 0,
    [dislikedSongs]
  );
  const [loading, setLoading] = useState(initialLoading);

  const isAllSongDisliked = dislikedSongs.size === songs.length;

  useEffect(() => {
    setSongs(initialSongs || []);
    if (onSongsChange) {
      onSongsChange(initialSongs);
    }
    setLoading(initialLoading);
  }, [initialSongs, initialLoading]);

  const onDislikeChange = (songId: number) => {
    setDislikedSongs((prev) => {
      const updatedSongs = new Set(prev);
      if (updatedSongs.has(songId)) {
        updatedSongs.delete(songId);
      } else {
        updatedSongs.add(songId);
      }
      return updatedSongs;
    });
  };

  const markAllForDisliked = () => {
    setDislikedSongs(new Set(songs.map((_, index) => index + 1)));
  };

  const removeAllFromDisliked = () => {
    setDislikedSongs(new Set());
  };

  const changePlaylist = async () => {
    if (dislikedSongs.size === 0) return;

    setLoading(true);
    try {
      const songsForRefresh = songs.map((song) => ({
        name: song.name,
        artist: song.artist,
        trackUri: song.trackUri,
        isReplace: dislikedSongs.has(song.id ?? 0),
      }));

      const response = await refreshAiPlaylist({
        mood: mood || '',
        event: event || '',
        songs: songsForRefresh,
        requestChangesText: requestText,
      });

      if (response?.updatedPlaylist?.data) {
        const updatedSongs = response.updatedPlaylist.data.map(
          (song: Song, index: number) => ({
            id: index + 1,
            name: song.name,
            artist: song.artist,
            trackUri: song.trackUri,
          })
        );
        setSongs(updatedSongs);
        // Reset disliked songs
        setDislikedSongs(new Set());
        if (onSongsChange) {
          onSongsChange(updatedSongs);
        }
        setRequestText('');
      }
    } catch (error) {
      console.error('Error refreshing playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const openChatDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSaveRequest = () => {
    setRequestText(dialogText);
    setIsDialogOpen(false);
  };

  const GradientDefs = () => (
    <svg width="0" height="0">
      <defs>
        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme.palette.customColors.pink} />
          <stop
            offset="50%"
            stopColor={theme.palette.customColors.lightPurple}
          />
          <stop offset="100%" stopColor={theme.palette.customColors.medium} />
        </linearGradient>
      </defs>
    </svg>
  );

  const chatDialog = () => (
    <Dialog
      open={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
        setDialogText(requestText);
      }}
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <ShinyCard
        colors={['#8d92f6', '#a2dfd0']}
        sx={{ padding: 0, width: '100%', borderRadius: '16px' }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.customColors.textMain,
            textAlign: 'center',
            fontSize: '1.3rem',
            pt: 2,
          }}
        >
          Have a Request?
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
            Add any special requests for the AI here — they’ll be considered
            when you click refresh!
          </DialogContentText>
          <StyledTextArea
            minRows={4}
            placeholder="Tell the AI exactly what you want!"
            onChange={(e) => setDialogText(e.target.value)}
            value={dialogText}
          />
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 16px 24px',
            gap: 2,
          }}
        >
          <StyledMenuButton onClick={handleSaveRequest}>
            Save Request
          </StyledMenuButton>
        </DialogActions>
      </ShinyCard>
    </Dialog>
  );

  return (
    <Box className="center" sx={{ height: '60vh' }}>
      <StyledPageTitle>Almost done! any changes?</StyledPageTitle>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          boxShadow: 'rgba(0, 0, 0, 0.45) 0px 12px 20px -20px',
        }}
      >
        <div className="playlist-actions">
          <Box sx={{ position: 'absolute', left: '0' }}>
            <GradientDefs />
            <IconButton onClick={openChatDialog}>
              <Badge
                invisible={!requestText.trim()}
                overlap="circular"
                badgeContent={
                  <CheckCircleIcon
                    sx={{
                      width: 14,
                      height: 14,
                      color: theme.palette.customColors.pink,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                }
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <StyledGradientChatIcon />
              </Badge>
            </IconButton>
          </Box>

          <StyledRefreshButton
            disabled={isRefreshDisabled}
            onClick={changePlaylist}
            startIcon={<RefreshIcon />}
            sx={{ width: { xs: '50vw', sm: '30vw' } }}
          >
            Refresh
          </StyledRefreshButton>

          <Box sx={{ position: 'absolute', right: '0' }}>
            <IconButton
              onClick={
                isAllSongDisliked ? removeAllFromDisliked : markAllForDisliked
              }
              sx={{
                border: `1px solid ${pinkColor}`,
                color: pinkColor,
              }}
            >
              {isAllSongDisliked ? (
                <PlaylistRemoveIcon />
              ) : (
                <PlaylistAddCheckIcon />
              )}
            </IconButton>
          </Box>
        </div>
      </Box>

      <StyledContentContainer sx={{ height: '60vh', paddingTop: 0 }}>
        {loading ? (
          <Box sx={{ marginTop: '10%' }}>
            <Loader height="100%" />
          </Box>
        ) : (
          <Box className="center">
            {songs.map((song) => (
              <Box
                className="center"
                sx={{ margin: '5px', width: '100%' }}
                key={song.id}
              >
                <SongResult
                  song={song}
                  isDisliked={dislikedSongs.has(song.id ?? 0)}
                  onDislikeChange={() => onDislikeChange(song.id ?? 0)}
                />
              </Box>
            ))}
          </Box>
        )}

        {chatDialog()}
      </StyledContentContainer>
    </Box>
  );
};
