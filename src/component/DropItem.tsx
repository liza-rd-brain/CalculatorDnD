import { FC, useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";
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
  /*   box-sizing: border-box;
  & > * {
    margin-bottom: 26px;
  }
  & > :last-child {
    margin-bottom: 0;
  } */
`;

type DropItemProps = {
  getCalculatorList: (ref: any) => JSX.Element[];
  hoverRef: React.MutableRefObject<{
    orderNumber: number | undefined;
  }>;
};

export const DropItem: FC<DropItemProps> = ({
  getCalculatorList,
  hoverRef,
}) => {
  const { state, dispatch } = useAppContext();
  const refTest = useRef<HTMLDivElement>(null);
  const isCanvasEmpty = !state.canvas.length;

  const [{ isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: [ItemDragType.CONSTRUCTOR_ITEM, ItemDragType.CALCULATOR_ITEM],
      hover: (item: { id: CalculatorItemName; index: number }, monitor) => {
        if (!refTest.current) {
          return;
        }

        if (isCanvasEmpty) {
        } else {
          // if(){}
          hoverRef.current.orderNumber = state.canvas.length - 1;

          const hoverBoundingRect = refTest.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

          // Determine mouse position
          const clientOffset = monitor.getClientOffset();

          // Get pixels to the top
          const hoverClientY =
            (clientOffset as XYCoord).y - hoverBoundingRect.top;

          const newHoverIndex = undefined;
        }
      },
      drop: (item, monitor) => {
        hoverRef.current.orderNumber = undefined;
        /* console.log("made drop") */
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        handlerId: monitor.getHandlerId(),
      }),
    }),

    [state.canvas, state.sideBar]
  );

  drop(refTest);

  return (
    <StyledDropBlock isHover={isOver && isCanvasEmpty} ref={refTest}>
      {getCalculatorList(refTest)}
    </StyledDropBlock>
  );
};
