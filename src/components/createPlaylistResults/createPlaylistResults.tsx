import { Box } from "@mui/material";
import { StyledContentContainer, StyledMenuButton, StyledPageTitle } from "../styledComponents";
import { SongResult } from "./songResult";
import Textarea from '@mui/joy/Textarea';
import { useState } from "react";

const songs = [
  { id: 1, title: "Song A", artist: "Artist A" },
  { id: 2, title: "Song B", artist: "Artist B" },
  { id: 3, title: "Song C", artist: "Artist C" },
  { id: 4, title: "Song E", artist: "Artist E" },
  { id: 5, title: "Song F", artist: "Artist F" },
  { id: 6, title: "Song G", artist: "Artist G" },
  { id: 7, title: "Song H", artist: "Artist H" },
  { id: 8, title: "Song I", artist: "Artist I" },
  { id: 9, title: "Song J", artist: "Artist J" },
  { id: 10, title: "Song K", artist: "Artist K" },
];

export const CreatePlaylistResults: React.FC = () =>  {
  const [requestText, setRequetText] = useState('');
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(true);
  const [dislikedSongs, setDislikedSongs] = useState<number[]>([]);

  const onDislikeChange = (isDislike: boolean, id: number) => {
    setDislikedSongs(prev => {
      let updated: number[];
  
      if (isDislike) {
        updated = prev.includes(id) ? prev : [...prev, id];
      } else {
        updated = prev.filter(songId => songId !== id);
      }
  
      setIsRefreshDisabled(updated.length === 0);
  
      return updated;
    });
  };

  const changePlaylist = () => {
    console.log(dislikedSongs)
    console.log(requestText)
  };

  return (
    <Box className="center">
      <StyledPageTitle>Almost done! Make some changes</StyledPageTitle>
      <StyledMenuButton disabled={isRefreshDisabled} sx={{padding: '10px', marginTop: '5px'}} onClick={changePlaylist}> 
        Refersh! 
      </StyledMenuButton>
      <StyledContentContainer>
      <Box className="center">
        <Box sx={{ width: '80%'}}>
          {songs.map((song) => (
            <Box sx={{ margin: '5px'}}>
              <SongResult id={song.id} title={song.title} artist={song.artist} onDislikeChange={onDislikeChange}/>
            </Box>
          ))}
          <Textarea sx={{ marginTop: '20px' }} minRows={2} placeholder="Any requests?" onChange={e => setRequetText(e.target.value)}/>
        </Box>
      </Box>
      </StyledContentContainer>
    </Box>
  );
};
