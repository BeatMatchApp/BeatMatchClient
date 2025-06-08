import { Box, TextareaAutosize, Typography } from "@mui/material";
import { StyledContentContainer, StyledMenuButton, StyledPageTitle } from "../styledComponents";
import { SongResult } from "./songResult";
import { useEffect, useMemo, useState } from "react";
import { refreshAiPlaylist} from "../../services/aiService.ts";
import {Song} from "../../models/Playlist.ts";

interface Props {
  songs: Song[];
  loading: boolean;
  vibe?: string | null;
  activity?: string | null;
  onSongsChange?: (songs: Song[]) => void;

}

export const CreatePlaylistResults: React.FC<Props> = ({
                                                         songs: initialSongs,
                                                         loading: initialLoading,
                                                         vibe,
                                                         activity,
                                                         onSongsChange
                                                       }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [requestText, setRequestText] = useState('');
  const [dislikedSongs, setDislikedSongs] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(initialLoading);
  const isRefreshDisabled = useMemo(() => dislikedSongs.size === 0, [dislikedSongs]);

  useEffect(() => {
    setSongs(initialSongs || []);
    if(onSongsChange) {
      onSongsChange(initialSongs);
    }
    setLoading(initialLoading);
  }, [initialSongs, initialLoading]);



  const onDislikeChange = (songId: number) => {
    setDislikedSongs(prev => {
      const updatedSongs = new Set(prev);
      if (updatedSongs.has(songId)) {
        updatedSongs.delete(songId);
      } else {
        updatedSongs.add(songId);
      }
      return updatedSongs;
    });
  };

  const changePlaylist = async () => {
    if (dislikedSongs.size === 0) return;

    setLoading(true);
    try {
      const songsForRefresh = songs.map(song => ({
        name: song.name,
        artist: song.artist,
        isReplace: dislikedSongs.has(song.id ?? 0)
      }));

      const response = await refreshAiPlaylist({
        vibe: vibe || '',
        activity: activity || '',
        songs: songsForRefresh,
        requestChangesText: requestText
      });

      if (response?.updatedPlaylist?.data ) {
        const updatedSongs = response.updatedPlaylist.data.map((song: Song, index: number) => ({
          id: index + 1,
          name: song.name,
          artist: song.artist
        }));
        setSongs(updatedSongs);
        // Reset disliked songs
        setDislikedSongs(new Set());
        if(onSongsChange) {
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

  return (
      <Box className="center">
        <StyledPageTitle>Almost done! Make some changes</StyledPageTitle>
        <StyledMenuButton
            disabled={isRefreshDisabled || loading}
            sx={{ padding: '10px', marginTop: '5px' }}
            onClick={changePlaylist}
        >
          {loading ? 'Refreshing...' : 'Refresh!'}
        </StyledMenuButton>
        <StyledContentContainer>
          <Box className="center">
            {loading ? (
                <Typography>Loading your playlist...</Typography>
            ) : (
                <Box sx={{ width: '80%' }}>
                  {songs.length > 0 ? (
                      songs.map((song) => (
                          <Box sx={{ margin: '5px' }} key={song.id}>
                            <SongResult
                                trackDetails={{ name: song.name, artist: song.artist }}
                                isDisliked={dislikedSongs.has(song.id ?? 0)}
                                onDislikeChange={() => onDislikeChange(song.id ?? 0)}
                            />
                          </Box>
                      ))
                  ) : (
                      <Typography>No songs available. Try different criteria or check your connection.</Typography>
                  )}
                  <TextareaAutosize
                      style={{ marginTop: '20px', height: '5vh', width: '100%', fontFamily: 'Poppins', resize: 'none' }}
                      minRows={2}
                      placeholder="Any requests?"
                      value={requestText}
                      onChange={e => setRequestText(e.target.value)}
                  />
                </Box>
            )}
          </Box>
        </StyledContentContainer>
      </Box>
  );
};