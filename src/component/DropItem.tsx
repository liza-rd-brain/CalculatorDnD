import { FC, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemDragType } from "../App";

import { useAppContext } from "../App.provider";

import { CalculatorItem, CalculatorItemName } from "../business/types";

const StyledDropBlock = styled.div<{ isHover: boolean }>`
  width: 240px;
  height: 100%;
  display: flex;
  gap: 26px;
  flex-direction: column;
  align-items: center;
  background-color: ${({ isHover }) => {
    if (isHover) {
      return "#F0F9FF";
    }
  }};
`;

type DropItemProps = {
  calculatorList: JSX.Element[];
  hoverRef: React.RefObject<HTMLDivElement>;
};

export const DropItem: FC<DropItemProps> = ({ calculatorList, hoverRef }) => {
  const { state, dispatch } = useAppContext();
  const isCanvasEmpty = !state.canvas.length;

  const [{ isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: [ItemDragType.CONSTRUCTOR_ITEM, ItemDragType.CALCULATOR_ITEM],
      hover: (item: { id: CalculatorItemName; index: number }, monitor) => {
        if (isCanvasEmpty) {
          console.log("hover drop");
        }
      },
      drop: () => console.log("made drop"),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: true,
        handlerId: monitor.getHandlerId(),
      }),
    }),

    [state.canvas, state.sideBar]
  );

  return (
    <StyledDropBlock isHover={isOver && isCanvasEmpty} ref={drop}>
      {calculatorList}
    </StyledDropBlock>
  );
};
