import { Typography, IconButton } from "@mui/material";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 32px 0;
`;

const Title = styled(Typography)`
  margin-bottom: 8px;
  font-weight: bold;
`;

const ScrollArea = styled.div`
  position: relative;
  margin: 0 16px;
`;

const ScrollContent = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 8px;
  padding: 0 8px;
`;

const ScrollButton = styled(IconButton)<{ side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.side === "left" ? "left: -30px;" : "right: -30px;")}
  transform: translateY(-50%);
  z-index: 2;
`;

const SelectableItem = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 16px;
  white-space: nowrap;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(to right, #f200c2, #6c00ff)"
      : "linear-gradient(to right, #f5f5f5, #ddd)"};
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
