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
  color: theme.palette.customColors.textSecondary,
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
  transition: 'all 0.2s ease-in-out',
  display: 'inline-block',
    '&:focus': {
    outlineColor: '#6a90dd'
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
  border: '1px solid #ccc'
});

export const StyledSelectableItem = styled(Box)<{ selected: boolean }>(({ selected, theme }) => ({
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
}));