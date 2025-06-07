import { Box } from '@mui/material';
import {
  StyledContentContainer,
  StyledPageTitle,
  StyledRefreshButton,
  StyledTextArea,
} from '../styledComponents';
import { SongResult } from './songResult';
// import Textarea from '@mui/joy/Textarea';
import { useMemo, useState } from 'react';

const songs = [
  { id: 1, title: 'Song A', artist: 'Artist A' },
  { id: 2, title: 'Song B', artist: 'Artist B' },
  { id: 3, title: 'Song C', artist: 'Artist C' },
  { id: 4, title: 'Song E', artist: 'Artist E' },
  { id: 5, title: 'Song F', artist: 'Artist F' },
  { id: 6, title: 'Song G', artist: 'Artist G' },
  { id: 7, title: 'Song H', artist: 'Artist H' },
  { id: 8, title: 'Song I', artist: 'Artist I' },
  { id: 9, title: 'Song J', artist: 'Artist J' },
  { id: 10, title: 'Song K', artist: 'Artist K' },
];

export const CreatePlaylistResults: React.FC = () => {
  const [requestText, setRequetText] = useState('');
  const [dislikedSongs, setDislikedSongs] = useState<Set<number>>(new Set());
  const isRefreshDisabled = useMemo(
    () => dislikedSongs.size === 0,
    [dislikedSongs]
  );

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

  const changePlaylist = () => {
    console.log([...dislikedSongs]);
    console.log(requestText);
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
                trackDetails={{ songName: song.title, artist: song.artist }}
                isDisliked={dislikedSongs.has(song.id)}
                onDislikeChange={() => onDislikeChange(song.id)}
              />
            </Box>
          ))}
          <StyledTextArea
            minRows={4}
            placeholder="Any requests?"
            onChange={(e) => setRequetText(e.target.value)}
          />
        </Box>
      </StyledContentContainer>
    </Box>
  );
};
