import { StyledIconButton, StyledSongBox } from "../styledComponents";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box, Typography } from "@mui/material";
import { TrackDetails } from "../../models/AiResponse";

interface Props {
  trackDetails: TrackDetails;
  isDisliked: boolean;
  onDislikeChange: () => void;
}

export const SongResult: React.FC<Props> = ({ trackDetails, isDisliked, onDislikeChange }) => {

  return (
    <Box sx={{ backgroundColor: '#9C27B0' }}>
      <StyledSongBox>
        <Typography>{`${trackDetails.artist} - ${trackDetails.name}`}</Typography>
        <StyledIconButton size="small" onClick={onDislikeChange}>
          <ThumbDownIcon fontSize="small" sx={{ color: isDisliked ? '#590505' : 'white' }} />
        </StyledIconButton>
      </StyledSongBox>
    </Box>
  );
};
