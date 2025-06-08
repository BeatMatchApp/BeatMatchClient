import { StyledIconButton, StyledSongBox, StyledSongResultText} from "../styledComponents";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { TrackDetails } from "../../models/AiResponse";
import ShinyCard from "../ShinyCard/ShinyCard";

interface Props {
  trackDetails: TrackDetails;
  isDisliked: boolean;
  onDislikeChange: () => void;
}

export const SongResult: React.FC<Props> = ({ trackDetails, isDisliked, onDislikeChange }) => {

  return (
    <ShinyCard colors={['#8d92f6', '#a2dfd0']} small>
      <StyledSongBox>
        <StyledSongResultText>{`${trackDetails.artist} - ${trackDetails.songName}`}</StyledSongResultText>
        <StyledIconButton size="small" onClick={onDislikeChange}>
          <RefreshRoundedIcon fontSize="medium" sx={{ color: (theme) => isDisliked ? theme.palette.customColors.pink : 'grey' }} />
        </StyledIconButton>
      </StyledSongBox>
    </ShinyCard>
  );
};
