import { AppBar, Container } from "@mui/material";
import styled from "styled-components";

const NAVBAR_HEIGHT = 64;

export const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f9f9f9;
  overflow: hidden;
  position: relative;
`;

export const NavBar = styled(AppBar)`
  background-color: white;
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
`;

export const NavToggleGroup = styled.div`
  display: flex;
  gap: 16px;
  background-color: #f0f0f0;
  border-radius: 30px;
  padding: 4px;
`;

// todo: change purple to theme color
export const NavToggleButton = styled.button<{ selected: boolean }>`
  all: unset;
  padding: 6px 20px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? "purple" : "transparent"};
  color: ${({ selected, theme }) => (selected ? "#fff" : "purple")};
  transition: all 0.2s ease-in-out;
  border-color: #ffffff;
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
  z-index: 1;
`;
