import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Wrapper,
  ScrollArea,
  ScrollButton,
  ScrollContent,
} from "./styled";
import { ArrowDirections } from "./scrollableSelector.model";
import { StyledPageSubtitle, StyledSelectableItem } from "../styledComponents";

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

  const scroll = (direction: ArrowDirections) => {
    ref.current?.scrollBy({
      left: direction === ArrowDirections.LEFT ? -150 : 150,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <StyledPageSubtitle variant="h6">{title}</StyledPageSubtitle>
      <ScrollArea>
        <ScrollButton
          onClick={() => scroll(ArrowDirections.LEFT)}
          side={ArrowDirections.LEFT}>
          <ChevronLeft />
        </ScrollButton>

        <ScrollContent ref={ref}>
          {items.map((item) => (
            <StyledSelectableItem
              key={item}
              onClick={() => onSelect(item)}
              selected={selected === item}>
              {item}
            </StyledSelectableItem>
          ))}
        </ScrollContent>

        <ScrollButton
          onClick={() => scroll(ArrowDirections.RIGHT)}
          side={ArrowDirections.RIGHT}>
          <ChevronRight />
        </ScrollButton>
      </ScrollArea>
    </Wrapper>
  );
};
