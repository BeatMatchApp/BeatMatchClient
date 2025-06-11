import {
  StyledIconButton,
  StyledSongBox,
  StyledSongResultText,
} from '../styledComponents';
import ShinyCard from '../ShinyCard/ShinyCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Song } from '../../models/Playlist.ts';
import { CheckCircle } from '@mui/icons-material';
import { lightPinkColor, pinkColor } from '../../styles/colors.ts';

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
  const shinyCardColors = isDisliked
    ? [pinkColor, lightPinkColor]
    : ['#8d92f6', '#a2dfd0'];
  return (
    <ShinyCard colors={shinyCardColors} small>
      <StyledSongBox>
        <StyledSongResultText>{`${song.artist} - ${song.name}`}</StyledSongResultText>
        <StyledIconButton size="small" onClick={onDislikeChange}>
          {isDisliked ? (
            <CheckCircle
              color="primary"
              fontSize="medium"
              sx={{ color: (theme) => theme.palette.customColors.pink }}
            />
          ) : (
            <RefreshIcon fontSize="medium" sx={{ color: 'grey' }} />
          )}
        </StyledIconButton>
      </StyledSongBox>
    </ShinyCard>
  );
};
