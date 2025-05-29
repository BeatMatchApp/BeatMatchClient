import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Wrapper,
  ScrollArea,
  ScrollButton,
  ScrollContent,
  SelectableItem,
  Title,
} from "./styled";
import { ArrowDirections } from "./scrollableSelector.model";

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
      <Title variant="h6">{title}</Title>
      <ScrollArea>
        <ScrollButton
          onClick={() => scroll(ArrowDirections.LEFT)}
          side={ArrowDirections.LEFT}>
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

        <ScrollButton
          onClick={() => scroll(ArrowDirections.RIGHT)}
          side={ArrowDirections.RIGHT}>
          <ChevronRight />
        </ScrollButton>
      </ScrollArea>
    </Wrapper>
  );
};
