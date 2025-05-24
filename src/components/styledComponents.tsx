import { Box, Button, IconButton, styled, Typography, TypographyProps } from "@mui/material";

export const StyledMenuButton = styled(Button)({
  fontFamily: 'Poppins',
  textTransform: 'none',
  backgroundColor: "#715cf8",
  color: "white",
  width: "12em",
  "&:hover": {
    backgroundColor: "#5a4cc8",
  },
  "&:disabled": {
    backgroundColor: "#9e9e9e",
    color: 'white',
  },
});

export const StyledLoadingBox = styled(Box)({
  display: 'flex', 
  justifyContent: 'center'
});

export const StyledPageTitle = styled((props: TypographyProps) => (
  <Typography variant="h4" {...props} />
))({
  color: '#5a36a1',
  textAlign: 'center',
  fontWeight: 'bold'
});

export const StyledPageSubtitle = styled((props: TypographyProps) => (
  <Typography variant="h6" {...props} />
))({
  color: '#5a36a1',
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