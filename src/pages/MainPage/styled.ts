import { AppBar, Container } from '@mui/material';
import styled from 'styled-components';

export const NavBar = styled(AppBar)`
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  direction: rtl;
  box-shadow: none;
  position: relative;
  z-index: auto !important;
`;

export const ContentContainer = styled(Container).attrs(() => ({
  disableGutters: true,
  maxWidth: false,
}))`
  height: 92vh;
  overflow-y: auto;
  padding-bottom: 10px;
`;
