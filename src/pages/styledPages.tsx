import {
  Box,
  Card,
  styled
} from '@mui/material';

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
  gap: '2vh',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '30vw',
  },
}));