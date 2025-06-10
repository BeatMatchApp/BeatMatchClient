import {
  StyledIconButton,
  StyledSongBox,
  StyledSongResultText,
} from '../styledComponents';
import ShinyCard from '../ShinyCard/ShinyCard';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {Song} from "../../models/Playlist.ts";

interface Props {
  song: Song;
  isDisliked: boolean;
  onDislikeChange: () => void;
}

export const SongResult: React.FC<Props> = ({
                                              song,
                                              isDisliked,
                                              onDislikeChange,
                                            }) => {
  return (
    <ShinyCard colors={['#8d92f6', '#a2dfd0']} small>
      <StyledSongBox>
        <StyledSongResultText>{`${song.artist} - ${song.name}`}</StyledSongResultText>
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
