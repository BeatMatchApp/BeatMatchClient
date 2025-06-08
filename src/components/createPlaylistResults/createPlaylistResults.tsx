import { Box } from '@mui/material';
import {
  StyledContentContainer,
  StyledPageTitle,
  StyledRefreshButton,
  StyledTextArea,
} from '../styledComponents';
import { SongResult } from './songResult';
// import Textarea from '@mui/joy/Textarea';
import {useEffect, useMemo, useState} from 'react';
import {Song} from "../../models/Playlist.ts";
import { refreshAiPlaylist} from "../../services/aiService.ts";

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
  const isRefreshDisabled = useMemo(
    () => dislikedSongs.size === 0,
    [dislikedSongs]
  );
  const [_, setLoading] = useState(initialLoading);

  useEffect(() => {
    setSongs(initialSongs || []);
    if(onSongsChange) {
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
      <StyledRefreshButton
        disabled={isRefreshDisabled}
        onClick={changePlaylist}
      >
        Refresh the selected songs!
      </StyledRefreshButton>
      <StyledContentContainer sx={{ height: '55vh' }}>
        <Box className="center">
          {songs.map((song) => (
            <Box className="center" sx={{ margin: '5px' }} key={song.id}>
              <SongResult
                trackDetails={{ name: song.name, artist: song.artist }}
                isDisliked={dislikedSongs.has(song.id ?? 0)}
                onDislikeChange={() => onDislikeChange(song.id ?? 0)}
              />
            </Box>
          ))}
          <StyledTextArea
            minRows={4}
            placeholder="Any requests?"
            onChange={(e) => setRequestText(e.target.value)}
          />
        </Box>
      </StyledContentContainer>
    </Box>
  );
};