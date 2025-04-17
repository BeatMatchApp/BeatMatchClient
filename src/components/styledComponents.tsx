import { Box, Button, styled, Typography, TypographyProps } from "@mui/material";

export const StyledMenuButton = styled(Button)({
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