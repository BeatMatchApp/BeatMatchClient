import {
  StyledIconButton,
  StyledSongBox,
  StyledSongResultText,
} from '../styledComponents';
import { TrackDetails } from '../../models/AiResponse';
import ShinyCard from '../ShinyCard/ShinyCard';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface Props {
  trackDetails: TrackDetails;
  isDisliked: boolean;
  onDislikeChange: () => void;
}

export const SongResult: React.FC<Props> = ({
  trackDetails,
  isDisliked,
  onDislikeChange,
}) => {
  return (
    <ShinyCard colors={['#8d92f6', '#a2dfd0']} small>
      <StyledSongBox>
        <StyledSongResultText>{`${trackDetails.artist} - ${trackDetails.songName}`}</StyledSongResultText>
        <StyledIconButton size="small" onClick={onDislikeChange}>
          {isDisliked ? (
            <RemoveCircleIcon
              color="primary"
              fontSize="medium"
              sx={{ color: (theme) => theme.palette.customColors.pink }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              fontSize="medium"
              sx={{ color: 'grey' }}
            />
          )}
        </StyledIconButton>
      </StyledSongBox>
    </ShinyCard>
  );
};
