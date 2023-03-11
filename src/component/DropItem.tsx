import { FC, useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";
import styled from "styled-components";
import { ItemDragType, DragType } from "../App";

import { useAppContext } from "../App.provider";

import { CalculatorItem, CalculatorItemName } from "../business/types";

import separator from "./underline.png";

const TestBlock = styled.div<{ hasUnderline: boolean }>`
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${({ hasUnderline }) => {
    if (hasUnderline) {
      return `url(${separator})`;
    }
  }};
  background-position: bottom;
`;

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
        monitor.isOver({ shallow: true });

        if (!dropNodeRef.current) {
          return;
        }
        /*    console.log("started underline"); */
        hoverItemInfo.current.underlineDropElem = true;
        const dropBlock = document.getElementById("styledDropBlock");
        if (dropBlock) {
          const lastDragItem = dropBlock.querySelector(
            ".styledDrag .styledDropBlock:last-child"
          );
          // const lastDragItem = Array.from(
          //   dropBlock.querySelectorAll(".styledDrag")
          // ).at(-1);
          /*           console.log("lastDragItem", lastDragItem); */
        }

        // dragList?.length
      },
      drop: (item, monitor) => {
        hoverItemInfo.current.underlineDropElem = false;
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
  if (!isOver) {
    hoverItemInfo.current.underlineDropElem = false;
    console.log("!isOver");
  }

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
