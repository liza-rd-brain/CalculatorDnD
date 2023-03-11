import { FC, useRef } from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";

import { useAppContext } from "../App.provider";
import { DragType, ItemDragType } from "../App";
import { CalculatorItemName, CalculatorItemView } from "../business/types";
import { Display } from "./Display";
import { OperationList } from "./OperationList";
import { NumberPanel } from "./NumberPanel";
import { EqualSign } from "./EqualSign";

import separator from "./underline.png";

const StyledDragBlock = styled.div<{
  hasHoverTop?: boolean;
  hasHoverBottom?: boolean;
}>`
  position: relative;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${({ hasHoverBottom }) => {
    if (hasHoverBottom) {
      return `url(${separator})`;
    }
  }};
  background-position: bottom;
`;

type DragProps = {
  id: string;
  name: CalculatorItemName;
  view: CalculatorItemView;
  type: DragType;
  currIndex?: number;
  hoverItemInfo?: React.MutableRefObject<{
    underlineLevel: number | undefined;
    testProperty?: any;
  }>;
  hasBorder?: boolean;
};

type DropResult = {
  name: CalculatorItemName;
};

const getCalculator = (
  name: CalculatorItemName,
  hasHover: boolean,
  view: CalculatorItemView,
  hasBorder: boolean = false
) => {
  switch (name) {
    case "display": {
      return <Display view={view} hasBorder={hasBorder} />;
    }
    case "operationList": {
      return <OperationList view={view} hasBorder={hasBorder} />;
    }

    case "numberPanel": {
      return <NumberPanel view={view} hasBorder={hasBorder} />;
    }
    case "equalSign": {
      return <EqualSign view={view} hasBorder={hasBorder} />;
    }

    default: {
      return null;
    }
  }
};

export const DragItem: FC<DragProps> = ({
  id,
  name,
  view,
  type,
  currIndex,
  hoverItemInfo,

  hasBorder,
}) => {
  const { state, dispatch } = useAppContext();
  const dragNodeRef = useRef<HTMLDivElement>(null);

  if (hoverItemInfo) {
    hoverItemInfo.current.underlineLevel = undefined;
    // underlineLevel.current.testProperty = false;
  }

  if (
    dragNodeRef.current &&
    !hoverItemInfo?.current.testProperty &&
    Number(currIndex) + 1 !== state.canvas.length
  ) {
    dragNodeRef.current.style.backgroundImage = "none";
  }

  //НА КАКОЙ ПОРЯДОК ВСТАНЕТ ЭТОТ ЭЛЕМЕНТ
  const newIndex = useRef<number | undefined>(undefined);

  if (Number(currIndex) === Number(hoverItemInfo?.current.underlineLevel)) {
  }

  const hasHover =
    Number(currIndex) === Number(hoverItemInfo?.current.underlineLevel);
  if (hasHover) {
  }

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: type,
      item: { id, name, index: currIndex, containerType: type },
      end: (item, monitor) => {
        console.log("remove all underline");
        if (dragNodeRef.current) {
          dragNodeRef.current.style.backgroundImage = "none";
        }
        if (hoverItemInfo) {
          hoverItemInfo.current.underlineLevel = undefined;
          hoverItemInfo.current.testProperty = false;
        }

        const dropResult = monitor.getDropResult<any>();

        if (item && dropResult && type === "constructorItem") {
          dispatch({ type: "copyItem", payload: { name, type: type } });
        } else if (
          item &&
          type === "calculatorItem" &&
          dropResult &&
          dropResult.index &&
          typeof dropResult.index.current === "number" &&
          dropResult.index.current !== currIndex
        ) {
          dispatch({
            type: "sortItem",
            //now for sure here be index - number!
            payload: {
              initIndex: currIndex as number,
              draggingNewIndex: dropResult.index.current,
            },
          });
        }
      },
      isDragging: (monitor) => {
        return true;
      },

      collect: (monitor) => ({ isDragging: monitor.isDragging() }),

      canDrag: () => {
        return view === "active";
      },
    }),
    [state.sideBar, state.canvas]
  );

  const [{ isOver, canDrop, handlerId }, drop] = useDrop(
    () => ({
      accept: [ItemDragType.CONSTRUCTOR_ITEM, ItemDragType.CALCULATOR_ITEM],
      drop: () => {
        if (dragNodeRef.current) {
          dragNodeRef.current.style.backgroundImage = "none";
        }

        if (hoverItemInfo) {
          hoverItemInfo.current.underlineLevel = undefined;
          hoverItemInfo.current.testProperty = false;
        }

        if (typeof newIndex.current === "number") {
          return { index: newIndex };
        }
      },

      hover: (
        item: {
          name: CalculatorItemName;
          index: number;
          containerType: DragType;
          id: string;
        },
        monitor
      ) => {
        console.log("id", id);

        //? очистка предыдущего
        if (hoverItemInfo) {
          hoverItemInfo.current.testProperty = false;
        }

        //? очистка предыдущего
        if (
          !isOver &&
          hoverItemInfo &&
          dragNodeRef.current &&
          !hoverItemInfo.current.testProperty
        ) {
          dragNodeRef.current.style.backgroundImage = "none";
        }

        if (!canDrop && type === "constructorItem") {
          if (hoverItemInfo) {
            hoverItemInfo.current.underlineLevel = undefined;
            hoverItemInfo.current.testProperty = false;
          }
        } else if (type === "calculatorItem") {
          if (
            !dragNodeRef.current ||
            typeof currIndex !== "number" ||
            !hoverItemInfo
          ) {
            return;
          }

          newIndex.current = currIndex;
          const hoverBoundingRectDrop =
            dragNodeRef.current?.getBoundingClientRect();

          //!!! middle of hover element
          const dropMiddleYCoord =
            hoverBoundingRectDrop.y + hoverBoundingRectDrop.height / 2;

          // Determine mouse position
          //!!!! it is position of drag

          // console.log("coordDragX", coordDragX);

          const coordDragY = monitor.getClientOffset()?.y as number;
          const coordDragX = monitor.getClientOffset()?.x as number;

          const dragIndex = item.index;
          const hoverIndex = currIndex;

          //*УСЛОВИЕ:

          const inAreaHorizontal =
            coordDragX - 5 > hoverBoundingRectDrop.left &&
            coordDragX + 5 < hoverBoundingRectDrop.right;

          // console.log("inAreaHorizontal", inAreaHorizontal);

          const isAboveMiddle = coordDragY - dropMiddleYCoord < 0;

          const outOfAreaTop = coordDragY - 5 < hoverBoundingRectDrop.y;

          const outOfAreaBottom = coordDragY - 5 < hoverBoundingRectDrop.y;

          const hoverDeltaNumber = isAboveMiddle
            ? newIndex.current
            : newIndex.current + 1;

          //!!!where pull from constructor there is no overlap
          const targetIsNotDropEl =
            item.containerType === "constructorItem" ||
            (hoverDeltaNumber !== dragIndex &&
              hoverDeltaNumber !== dragIndex + 1);

          hoverItemInfo.current.underlineLevel = targetIsNotDropEl
            ? hoverDeltaNumber
            : undefined;

          const hasHoverTop =
            hoverItemInfo?.current.underlineLevel === 0 &&
            inAreaHorizontal &&
            !outOfAreaTop;

          const hasHoverBottom =
            Number(currIndex) + 1 ===
              Number(hoverItemInfo?.current.underlineLevel) && inAreaHorizontal;

          if (hasHoverTop) {
            dragNodeRef.current.style.backgroundImage = `url(${separator})`;
            dragNodeRef.current.style.backgroundPosition = "top";
          } else if (hasHoverBottom) {
            dragNodeRef.current.style.backgroundImage = `url(${separator})`;
            dragNodeRef.current.style.backgroundPosition = "bottom";
          } else {
            dragNodeRef.current.style.backgroundImage = "none";
          }
          newIndex.current = hoverIndex;
        }
      },

      canDrop: (item, monitor) => {
        // return true;
        if (type === "calculatorItem") {
          return true;
        } else {
          if (hoverItemInfo) {
            hoverItemInfo.current.underlineLevel = undefined;
          }
          return false;
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [state.sideBar, state.canvas]
  );

  if (
    !isDragging &&
    hoverItemInfo &&
    dragNodeRef.current &&
    !hoverItemInfo.current.testProperty
  ) {
  }

  drag(drop(dragNodeRef));

  return (
    <StyledDragBlock
      ref={dragNodeRef}
      hasHoverBottom={
        hoverItemInfo?.current.testProperty &&
        Number(currIndex) + 1 === state.canvas.length
      }
    >
      {getCalculator(name, hasHover, view, hasBorder)}
    </StyledDragBlock>
  );
};
