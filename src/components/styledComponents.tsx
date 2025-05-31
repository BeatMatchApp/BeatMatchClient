import {
  Box,
  Button,
  Chip,
  styled,
  TextField,
  Typography,
  TypographyProps,
} from '@mui/material';


interface StyledChipProps {
  isSelected?: boolean;
}

export const StyledMenuButton = styled(Button)(({ theme, variant }) => ({
  backgroundColor: variant === 'outlined' ? 'white' : theme.palette.customColors.medium,
  color: variant === 'outlined' ? theme.palette.customColors.medium :  'white',
  width: '12em',
  '&:hover': {
    opacity: '0.9',
    backgroundColor: theme.palette.customColors.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.customColors.disabled,
    color: 'white',
  },
  maxHeight: '100%',
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
  color: theme.palette.customColors.textMain,
  textAlign: 'center',
}));

export const StyledFormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '40vw',
  height: '600px',
  border: `3px solid ${theme.palette.customColors.dark}`,
  borderRadius: '2em',
  padding: '30px',
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

