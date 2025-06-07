import {
  Box,
  Button,
  styled,
  TextField,
  Typography,
  TypographyProps,
  IconButton,
} from '@mui/material';
import { disabledColor, primaryColor } from '../styles/consts';


export const StyledMenuButton = styled(Button)({
  backgroundColor: primaryColor,
  color: 'white',
  width: '12em',
  '&:hover': {
    opacity: '0.7',
  },
  '&:disabled': {
    backgroundColor: disabledColor,
    color: 'white',
  },
  maxHeight: '100%',
});

export const StyledLoadingBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

export const StyledPageTitle = styled((props: TypographyProps) => (
  <Typography variant="h4" {...props} />
))({
  color: primaryColor,
  textAlign: 'center',
  fontWeight: 'bold',
});

export const StyledPageSubtitle = styled((props: TypographyProps) => (
  <Typography variant="h6" {...props} />
))({
  color: primaryColor,
  textAlign: 'center',
});

export const StyledContentContainer = styled(Box)({
  display: 'flex', 
  flexDirection: 'column',
  justifyContent: 'space-around',
  textAlign: 'center',
  width: '100%',
  maxwidth: '450px',
  padding: '1.5vh',
  boxSizing: 'border-box',
});

export const StyledSongBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 12px',
  }
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
export const StyledFormBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '40vw',
  height: '600px',
  border: `${primaryColor} solid 3px`,
  borderRadius: '2em',
  padding: '30px',
  overflowY: 'hidden',
});

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
  }
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
  }
}));

export const SongNumberTypography = styled(Typography)(({ theme }) => ({
  marginRight: '16px',
  width: '24px',
  textAlign: 'center',
  fontWeight: 'medium',
  [theme.breakpoints.down('sm')]: {
    marginRight: '12px',
    width: '20px',
    fontSize: '0.85rem',
  }
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
  }
}));
