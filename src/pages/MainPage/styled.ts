import { AppBar, Container } from '@mui/material';
import styled from 'styled-components';

const NAVBAR_HEIGHT = 64;

export const NavBar = styled(AppBar)`
  height: ${NAVBAR_HEIGHT}px;
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
  height: 100%;
  overflow-y: auto;
  padding-bottom: 10px;
`;
