import { useState } from "react";
import { StyledIconButton, StyledSongBox } from "../styledComponents";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box, Typography } from "@mui/material";

interface SongResultProps {
  id: number;
  title: string;
  artist: string;
  onDislikeChange: (isDislike: boolean, id: number) => void;
}

export const SongResult: React.FC<SongResultProps> = ({ id, title, artist, onDislikeChange }) => {
  const [isDisliked, setIsDisliked] = useState(false);

  const handleDislikeClick = () => {
    setIsDisliked(prev => {
      const newValue = !prev;
      onDislikeChange(newValue, id);
      return newValue;
    });
  };

  return (
    <Box sx={{ backgroundColor: '#9C27B0' }}>
      <StyledSongBox>
        <Typography>{`${artist} - ${title}`}</Typography>
        <StyledIconButton size="small" onClick={handleDislikeClick}>
          <ThumbDownIcon fontSize="small" sx={{ color: isDisliked ? '#590505' : 'white' }} />
        </StyledIconButton>
      </StyledSongBox>
    </Box>
  );
};
