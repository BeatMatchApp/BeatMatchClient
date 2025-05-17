import {
  Box,
  Button,
  styled,
  Typography,
  TypographyProps,
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

export const StyledFormBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '40vw',
  height: '600px',
  border: `${primaryColor} solid 3px`,
  borderRadius: '2em',
  padding: '30px',
});
