import { AppBar } from '@mui/material';
import styled from 'styled-components';

export const NavBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  direction: rtl;
  box-shadow: none;
  position: relative;
  z-index: auto !important;
`;
