import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
  TypographyProps,
} from '@mui/material';

interface StyledChipProps {
  isSelected?: boolean;
}

export const StyledMenuButton = styled(Button)(({ theme, variant }) => ({
  backgroundColor:
    variant === 'outlined' ? 'white' : theme.palette.customColors.medium,
  color: variant === 'outlined' ? theme.palette.customColors.medium : 'white',
  width: '50vw',
  textTransform: 'none',
  outline: 'none',
  boxShadow: 'none',
  '&:hover': {
    opacity: 0.8,
  },
  '&:disabled': {
    backgroundColor: theme.palette.customColors.disabled,
    color: 'white',
  },
  maxHeight: '100%',

  [theme.breakpoints.up('sm')]: {
    width: '20vw',
  },
}));

export const StyledRefreshButton = styled(StyledMenuButton)(({ theme }) => ({
  paddingTop: '1vh',
  marginTop: '1vh',
  background: theme.palette.customColors.pink,
}));

export const StyledLoadingBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

export const StyledPageTitle = styled((props: TypographyProps) => (
  <Typography variant="h4" {...props} />
))(({ theme }) => ({
  color: theme.palette.customColors.textMain,
  textAlign: 'center',
  fontWeight: 'bold',
}));

export const StyledPageSubtitle = styled((props: TypographyProps) => (
  <Typography variant="h6" {...props} />
))(({ theme }) => ({
  color: theme.palette.customColors.textSecondary,
  textAlign: 'center',
}));

export const StyledContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  textAlign: 'center',
  width: '100%',
  overflow: 'auto',
  maxwidth: '450px',
  padding: '1.5vh',
  boxSizing: 'border-box',
});

export const StyledSongBox = styled(Box)(({ theme }) => ({
  flexDirection: 'row',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: theme.palette.customColors.textSecondary,
  padding: '12px 16px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 12px',
  },
}));

export const StyledIconButton = styled(IconButton)({
  color: 'white',
  padding: '4px',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  '&:focus': {
    outline: 'none',
  },
});
export const StyledFormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '40vw',
  height: '600px',
  border: `3px solid ${theme.palette.customColors.dark}`,
  borderRadius: '2em',
  padding: '30px',
  overflowY: 'hidden',
}));

export const StyledTextField = styled(TextField)({
  background: 'white',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: '#fafafa',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '12px',
  },
});

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<StyledChipProps>(({ theme, isSelected }) => ({
  '&.MuiChip-outlined .MuiChip-label': {
    color: theme.palette.customColors.medium,
  },
  '&.MuiChip-filled .MuiChip-label': {
    color: 'white',
  },

  backgroundColor: isSelected ? theme.palette.customColors.pink : 'transparent',
  borderColor: isSelected
    ? theme.palette.customColors.pink
    : theme.palette.customColors.medium,
  color: isSelected ? 'white' : theme.palette.customColors.medium,

  '&:hover': {
    backgroundColor: isSelected
      ? theme.palette.customColors.pink
      : theme.palette.customColors.medium,
    color: 'white',
  },

  '&:active': {
    backgroundColor: isSelected
      ? theme.palette.customColors.pink
      : theme.palette.customColors.medium,
    color: 'white',
  },
}));

export const StyledNavToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
  all: 'unset',
  padding: '6px 20px',
  borderRadius: '30px',
  fontSize: '0.85rem',
  fontWeight: 500,
  cursor: 'pointer',
  backgroundColor: selected ? theme.palette.customColors.medium : 'transparent',
  color: selected ? '#fff' : theme.palette.customColors.medium,
  transition:
    'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
  display: 'inline-block',
  '&:focus': {
    outlineColor: '#6a90dd',
  },
}));

export const StyledNavToggleGroup = styled('div')({
  position: 'relative',
  backgroundColor: 'transparent',
  userSelect: 'none',
  display: 'flex',
  gap: '16px',
  borderRadius: '30px',
  padding: '4px',
  border: '1px solid #ccc',
});

export const StyledSelectableItem = styled(Box)<{ selected: boolean }>(
  ({ selected, theme }) => ({
    padding: '8px 16px',
    borderRadius: 16,
    whiteSpace: 'nowrap',
    background: selected
      ? theme.palette.customColors.pink
      : 'linear-gradient(to right, #f5f5f5, #ddd)',
    color: selected ? 'white' : '#333',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    boxShadow: selected ? '0 0 6px rgba(0,0,0,0.2)' : 'none',
    transition: 'background 0.2s ease',
  })
);

export const StyledSongResultBox = styled(Box)(({ theme }) => ({
  background: theme.palette.customColors.pink,
}));

export const StyledSongResultText = styled(Typography)({
  fontWeight: 'bold',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  marginTop: '2vh',
  padding: '1vh',
  width: '90%',
  fontFamily: 'Poppins',
  resize: 'none',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: 'none',
  overflow: 'hidden',
  borderColor: '#cccccc',
  color: theme.palette.customColors.textMain,
}));

export const StyledSongContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#715cf8',
  borderRadius: '8px',
  marginBottom: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '6px',
  },
}));

export const StyledUnlikeIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  '&:focus': {
    outline: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px',
  },
}));

export const StyledSongNumberTypography = styled(Typography)(({ theme }) => ({
  marginRight: '16px',
  width: '24px',
  textAlign: 'center',
  fontWeight: 'medium',
  [theme.breakpoints.down('sm')]: {
    marginRight: '12px',
    width: '20px',
    fontSize: '0.85rem',
  },
}));

export const SongTitle = styled(Typography)(({ theme }) => ({
  fontWeight: '500',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '280px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '150px',
    fontSize: '0.9rem',
  },
}));

export const PlaylistAvatar = styled(Avatar)({
  width: 80,
  height: 80,
  marginRight: 20,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
});

export const PlaylistTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.customColors.textMain,
  fontWeight: 'bold',
  marginBottom: 4,
}));

export const PlaylistDataBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '3px',
}));

export const PlaylistDataTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.customColors.textMain,
  fontWeight: 'bold',
}));

export const PlaylistDataText = styled(Typography)(({ theme }) => ({
  color: theme.palette.customColors.medium,
}));

export const PlaylistMetaText = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
});

export const ActionIconButton = styled(IconButton)({
  color: '#715cf8',
  '&:hover': {
    backgroundColor: 'rgba(113, 92, 248, 0.1)',
  },
});

export const StyledPlaylistChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.pink,
  color: 'white',
  fontWeight: 500,
}));

export const PlaylistDescriptionText = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: 1.4,
});

export const StyledIconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  marginTop: '2vh',
});

export const StyledPageCard = styled(Card)(({ theme }) => ({
  width: '80vw',
  flexDirection: 'column',
  padding: '3vh',
  display: 'flex',
  margin: '0 auto',
  borderRadius: '15px',

  [theme.breakpoints.up('sm')]: {
    width: '50vw',
  },
}));

export const StyledCardBox = styled(Box)(({ theme }) => ({
  width: '60vw',
  padding: '1vh',
  display: 'flex',
  flexDirection: 'column',
  gap: '1vh',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '30vw',
  },
}));

export const StyledMainBox = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
}));
