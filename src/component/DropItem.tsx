import { FC, useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";
import styled from "styled-components";
import { ItemDragType, DragType } from "../App";

import { useAppContext } from "../App.provider";

import { CalculatorItem, CalculatorItemName } from "../business/types";

const StyledDropBlock = styled.div<{
  isHover: boolean;
  needBorder: boolean;
}>`
  width: 240px;
  height: 100%;

  /* margin: 20px 0px; */
  display: flex;
  /* gap: 12px; */
  flex-direction: column;
  align-items: center;
  background-color: ${({ isHover }) => {
    if (isHover) {
      return "#F0F9FF";
    }
  }};
  border: ${({ needBorder }) => {
    if (needBorder) {
      return "2px dashed #c4c4c4";
    }
  }};
  border-radius: 6px;
  /* gap: 12px; */
  /* box-sizing: border-box; */
  & > * {
    padding: 4px 0px 4px;
    width: 100%;
  }
  /* & > :nth-child(4) {
    padding-bottom: 0;
  } */
`;

type DropItemProps = {
  getCalculatorList: (ref: any) => JSX.Element[];
  hoverPositionRef: React.MutableRefObject<{
    orderNumber: number | undefined;
  }>;
};

export const DropItem: FC<DropItemProps> = ({
  getCalculatorList,
  hoverPositionRef,
}) => {
  const { state, dispatch } = useAppContext();
  const refTest = useRef<HTMLDivElement>(null);
  const isCanvasEmpty = !state.canvas.length;

  const [{ isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: [ItemDragType.CONSTRUCTOR_ITEM, ItemDragType.CALCULATOR_ITEM],
      hover: (
        item: {
          id: CalculatorItemName;
          index: number;
          containerType: DragType;
        },
        monitor
      ) => {
        if (!refTest.current) {
          return;
        }

        if (isCanvasEmpty) {
        } else {
          if (item.containerType === "constructorItem") {
            // console.log(item);
            //если тянем  из конструктора в калькулятор дефолтно подсветим нижни элемент
            //изначально hover вся равно будет на dropItem
            /* !!!!!!!! */
            hoverPositionRef.current.orderNumber = state.canvas.length;
          }
        }
      },
      drop: (item, monitor) => {
        hoverPositionRef.current.orderNumber = undefined;
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
    <StyledDropBlock
      isHover={isOver && isCanvasEmpty}
      ref={refTest}
      needBorder={isCanvasEmpty}
    >
      {getCalculatorList(refTest)}
    </StyledDropBlock>
  );
};
