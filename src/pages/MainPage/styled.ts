import { AppBar, Container } from '@mui/material';
import styled from 'styled-components';

const NAVBAR_HEIGHT = 64;

export const NavBar = styled(AppBar)`
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
`;

export const ContentContainer = styled(Container).attrs(() => ({
  disableGutters: true,
  maxWidth: false,
}))`
  padding: 0;
  margin: 0;
  padding-top: ${NAVBAR_HEIGHT}px;
  height: 100vh;
  overflow-y: auto;
  display: fixed;
`;
