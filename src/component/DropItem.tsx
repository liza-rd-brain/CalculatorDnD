import { FC, useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";
import styled from "styled-components";
import { ItemDragType, DragType } from "../App";

import { useAppContext } from "../App.provider";

import { CalculatorItem, CalculatorItemName } from "../business/types";
import { clearDropUnderline } from "../utils/changeSeparator";

import separator from "./underline.png";

const StyledDropBlock = styled.div<{
  isHover: boolean;
  needBorder: boolean;
}>`
  width: 240px;

  height: ${({ needBorder }) => {
    if (!needBorder) {
      return "456px";
    } else {
      return "100%";
    }
  }};

  display: flex;
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
  gap: 12px;
  /* box-sizing: border-box; */
  /*   & > * {
    padding: 6px 0px 6px;
    width: 100%;
  } */
  /* & > :nth-child(4) {
    padding-bottom: 0;
  } */
`;

type DropItemProps = {
  getCalculatorList: (ref: any) => JSX.Element[];
  hoverItemInfo: React.MutableRefObject<{
    underlineLevel: string | undefined;
    underlineDropElem?: any;
    elemWithUnderline: HTMLDivElement | undefined;
  }>;
};

export const DropItem: FC<DropItemProps> = ({
  getCalculatorList,
  hoverItemInfo,
}) => {
  const { state, dispatch } = useAppContext();
  const dropNodeRef = useRef<HTMLDivElement>(null);
  const isCanvasEmpty = !state.canvas.length;
  // underlineLevel.current.underlineDropElem = false;

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
        //* Если подсвечиваем уже dragElement на hover
        if (hoverItemInfo.current.elemWithUnderline) {
          return;
        }

        clearDropUnderline();

        // console.log(lastDrag);

        if (!dropNodeRef.current) {
          return;
        }
        if (item.containerType === "constructorItem") {
          hoverItemInfo.current.underlineDropElem = true;
        }
      },

      drop: () => {
        hoverItemInfo.current.underlineDropElem = false;

        const elemForUnderline = document.getElementById("styledDropBlock");
        const dragNodeList = elemForUnderline?.querySelectorAll(".styledDrag");

        const lastDrag =
          dragNodeList && (Array.from(dragNodeList).pop() as HTMLDivElement);
        if (lastDrag) {
          lastDrag.classList.remove("withSeparatorTop", "withSeparatorBottom");
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        handlerId: monitor.getHandlerId(),
      }),
    }),

    [state.canvas, state.sideBar]
  );

  drop(dropNodeRef);

  return (
    <StyledDropBlock
      isHover={isOver && isCanvasEmpty}
      ref={dropNodeRef}
      needBorder={isCanvasEmpty}
      id="styledDropBlock"
    >
      {getCalculatorList(dropNodeRef)}
      {/* <TestBlock
        hasUnderline={
          isOver && !isCanvasEmpty && hoverItemInfo.current.underlineDropElem
        }
      /> */}
    </StyledDropBlock>
  );
};
