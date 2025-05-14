import { Typography, IconButton } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  width: 100%;
`;

export const Title = styled(Typography)`
  margin-bottom: 12px !important;
  font-weight: bold;
`;

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ScrollContent = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
  gap: 8px;
`;

export const ScrollButton = styled(IconButton)<{ side: "left" | "right" }>`
  ${(props) =>
    props.side === "left"
      ? "margin-right: 12px !important;"
      : "margin-left: 12px !important;"}
`;

//todo: change purple to theme color
export const SelectableItem = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 16px;
  white-space: nowrap;
  background: ${(props) =>
    props.selected ? "purple" : "linear-gradient(to right, #f5f5f5, #ddd)"};
  color: ${(props) => (props.selected ? "white" : "#333")};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  box-shadow: ${(props) =>
    props.selected ? "0 0 6px rgba(0,0,0,0.2)" : "none"};
  transition: background 0.2s ease;
`;
