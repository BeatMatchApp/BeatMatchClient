import { Box, Button, IconButton, styled, Typography, TypographyProps, TextField } from "@mui/material";
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

export const StyledSongBox = styled(Box)({
  flexDirection: 'row',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  color: 'white',
});

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
