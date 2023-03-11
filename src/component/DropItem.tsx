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
  /* height: 100%; */
  height: ${({ needBorder }) => {
    if (!needBorder) {
      return "456px";
    } else {
      return "100%";
    }
  }};

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
    padding: 6px 0px 6px;
    width: 100%;
  }
  /* & > :nth-child(4) {
    padding-bottom: 0;
  } */
`;

type DropItemProps = {
  getCalculatorList: (ref: any) => JSX.Element[];
  hoverItemInfo: React.MutableRefObject<{
    underlineLevel: string | undefined;
    testProperty?: any;
  }>;
};

export const DropItem: FC<DropItemProps> = ({
  getCalculatorList,
  hoverItemInfo,
}) => {
  const { state, dispatch } = useAppContext();
  const refTest = useRef<HTMLDivElement>(null);
  const isCanvasEmpty = !state.canvas.length;
  // underlineLevel.current.testProperty = false;

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
        // console.log(hoverItemInfo);
        if (!refTest.current) {
          return;
        }

        if (isOver) {
          // hoverItemInfo.current.underlineLevel = undefined;
          hoverItemInfo.current.testProperty = false;
        }

        if (item.containerType === "constructorItem") {
          // console.log("hover drop");
          // hoverItemInfo.current.underlineLevel = `${state.canvas.length}`;
          hoverItemInfo.current.testProperty = true;
        } else {
        }
      },
      drop: (item, monitor) => {
        // console.log("item", item);
        // hoverItemInfo.current.underlineLevel = undefined;
        hoverItemInfo.current.testProperty = false;
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        handlerId: monitor.getHandlerId(),
      }),
    }),

    [state.canvas, state.sideBar]
  );

  if (!isOver) {
    hoverItemInfo.current.testProperty = false;
  }

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
