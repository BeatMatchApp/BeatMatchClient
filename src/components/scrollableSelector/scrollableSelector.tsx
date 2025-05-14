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
