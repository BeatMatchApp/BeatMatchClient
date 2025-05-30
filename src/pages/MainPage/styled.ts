import { AppBar, Container } from '@mui/material';
import styled from 'styled-components';
import { primaryColor } from '../../styles/consts';

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

export const NavToggleButton = styled.button<{ selected: boolean }>`
  all: unset;
  padding: 6px 20px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? primaryColor : 'transparent'};
  color: ${({ selected }) => (selected ? '#fff' : primaryColor)};
  transition: all 0.2s ease-in-out;
  border-color: #ffffff;
`;

export const ContentContainer = styled(Container).attrs(() => ({
  disableGutters: true,
  maxWidth: false,
}))`
  height: 100%;
  overflow-y: auto;
  margin-top: ${NAVBAR_HEIGHT}px;
  padding-bottom: 10px;
`;
