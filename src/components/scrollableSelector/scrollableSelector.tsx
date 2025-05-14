import { Typography, IconButton } from "@mui/material";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  width: 100%;
`;

const Title = styled(Typography)`
  margin-bottom: 12px !important;
  font-weight: bold;
`;

const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ScrollContent = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
  gap: 8px;
`;

const ScrollButton = styled(IconButton)<{ side: "left" | "right" }>`
  ${(props) =>
    props.side === "left"
      ? "margin-right: 12px !important;"
      : "margin-left: 12px !important;"}
`;

//todo: change purple to theme color
const SelectableItem = styled.div<{ selected: boolean }>`
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

export const ScrollableSelector = ({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: string[];
  selected: string | null;
  onSelect: (val: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({
      left: dir === "left" ? -150 : 150,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <Title variant="h6">{title}</Title>
      <ScrollArea>
        <ScrollButton onClick={() => scroll("left")} side="left">
          <ChevronLeft />
        </ScrollButton>

        <ScrollContent ref={ref}>
          {items.map((item) => (
            <SelectableItem
              key={item}
              onClick={() => onSelect(item)}
              selected={selected === item}>
              {item}
            </SelectableItem>
          ))}
        </ScrollContent>

        <ScrollButton onClick={() => scroll("right")} side="right">
          <ChevronRight />
        </ScrollButton>
      </ScrollArea>
    </Wrapper>
  );
};
