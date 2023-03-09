import { FC, useRef } from "react";
import styled from "styled-components";
import { useDrag, useDrop, XYCoord } from "react-dnd";

import { useAppContext } from "../App.provider";
import { DragType, ItemDragType } from "../App";
import { CalculatorItemName, CalculatorItemView } from "../business/types";
import { Display } from "./Display";
import { OperationList } from "./OperationList";
import { NumberPanel } from "./NumberPanel";
import { EqualSign } from "./EqualSign";

const StyledDragBlock = styled.div<{
  hasHoverTop: boolean;
  hasHoverBottom: boolean;
}>`
  position: relative;

  border-top: ${({ hasHoverTop }) => {
    if (hasHoverTop) {
      return "1px solid #5D5FEF";
    } else {
      return "1px solid white";
    }
  }};

  border-bottom: ${({ hasHoverBottom }) => {
    if (hasHoverBottom) {
      return "1px solid #5D5FEF";
    } else {
      return "1px solid white";
    }
  }};

  //TODO: took out common
  &:before {
    content: "";
    display: ${({ hasHoverTop, hasHoverBottom }) => {
      if (hasHoverTop || hasHoverBottom) {
        return "block";
      } else {
        return "none";
      }
    }};
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: #5d5fef;
    transform: rotate(45deg);
    top: ${({ hasHoverTop }) => {
      if (hasHoverTop) {
        return "-2px";
      }
    }};
    bottom: ${({ hasHoverBottom }) => {
      if (hasHoverBottom) {
        return "-2px";
      }
    }};
    left: -3px;
    z-index: 1;
  }
  &:after {
    content: "";
    display: ${({ hasHoverTop, hasHoverBottom }) => {
      if (hasHoverTop || hasHoverBottom) {
        return "block";
      } else {
        return "none";
      }
    }};
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: #5d5fef;
    transform: rotate(45deg);
    top: ${({ hasHoverTop }) => {
      if (hasHoverTop) {
        return "-2px";
      }
    }};
    bottom: ${({ hasHoverBottom }) => {
      if (hasHoverBottom) {
        return "-2px";
      }
    }};
    right: -3px;
    z-index: 1;
  }
`;

type DragProps = {
  id: CalculatorItemName;
  name: CalculatorItemName;
  view: CalculatorItemView;
  type: DragType;
  currIndex?: number;
  hoverPositionRef?: React.MutableRefObject<{
    orderNumber: number | undefined;
  }>;
  hasBorder?: boolean;
  refDropOverlay?: React.RefObject<HTMLDivElement>;
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
  hoverPositionRef,
  refDropOverlay,
  hasBorder,
}) => {
  const { state, dispatch } = useAppContext();
  const ref = useRef<HTMLDivElement>(null);

  //НА КАКОЙ ПОРЯДОК ВСТАНЕТ ЭТОТ ЭЛЕМЕНТ
  const newIndex = useRef<number | undefined>(undefined);

  if (Number(currIndex) === Number(hoverPositionRef?.current.orderNumber)) {
    // console.log("draw hover line");
  }

  const hasHover =
    Number(currIndex) === Number(hoverPositionRef?.current.orderNumber);
  if (hasHover) {
    /*     console.log(hasHover); */
  }

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: type,
      item: { id, index: currIndex, containerType: type },
      end: (item, monitor) => {
        /* 2: Get this index here! */
        // eslint-disable-next-line

        if (hoverPositionRef) {
          console.log("hoverEnd");
          hoverPositionRef.current.orderNumber = undefined;
        }

        const dropResult = monitor.getDropResult<any>();

        if (item && dropResult && type === "constructorItem") {
          dispatch({ type: "copyItem", payload: { id: id, type: type } });
        } else if (
          item &&
          type === "calculatorItem" &&
          dropResult &&
          dropResult.index &&
          typeof dropResult.index.current === "number" &&
          dropResult.index.current !== currIndex
        ) {
          console.log("sholud be sort");
          dispatch({
            type: "sortItem",
            //now for sure here be index - number!
            payload: {
              initIndex: currIndex as number,
              newIndex: dropResult.index.current,
            },
          });
        }
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
        if (hoverPositionRef) {
          console.log("endOfDrop");
          hoverPositionRef.current.orderNumber = undefined;
        }

        if (typeof newIndex.current === "number") {
          return { index: newIndex };
        }
      },

      hover: (item: { id: CalculatorItemName; index: number }, monitor) => {
        // console.log("hover on drag item");
        if (!canDrop && type === "constructorItem") {
          if (hoverPositionRef) {
            console.log("un draw hover line");
            hoverPositionRef.current.orderNumber = undefined;
          }
        } else if (type === "calculatorItem") {
          // console.log("drag calculator");
          if (
            !ref.current ||
            typeof currIndex !== "number" ||
            !hoverPositionRef
          ) {
            return;
          }

          newIndex.current = currIndex;

          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

          // Determine mouse position
          const clientOffset = monitor.getClientOffset();

          // Get pixels to the top
          const hoverClientY =
            (clientOffset as XYCoord).y - hoverBoundingRect.top;

          const dragIndex = item.index;
          const hoverIndex = currIndex;
          //УСЛОВИЕ:
          hoverPositionRef.current.orderNumber = hoverIndex;

          console.log(hoverPositionRef.current.orderNumber);

          // console.log(dragIndex, hoverIndex, hoverClientY, hoverMiddleY);

          /*    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY - 50) {
            // console.log("false 1");
            return;
          }

          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            // console.log("false 2");
            return;
          } else { */
          newIndex.current = hoverIndex;

          const result = [
            ["hoverIndex", hoverIndex],
            ["dragIndex", dragIndex],
            ["hoverClientY", hoverClientY],
            ["hoverMiddleY", hoverMiddleY],
          ];

          // console.table(result);

          // console.log(
          //   "change index",
          //   hoverIndex,
          //   dragIndex,
          //   hoverClientY,
          //   hoverMiddleY
          // );
          // dispatch({
          //   type: "sortItem",
          //   //now for sure here be index - number!
          //   payload: {
          //     initIndex: hoverIndex,
          //     newIndex: dragIndex,
          //   },
          // });
          /*    } */

          /* hoverPositionRef.current.orderNumber; */

          // console.log(clientOffset, hoverClientY);
        }
        // newIndex.current = currIndex as number;
      },

      canDrop: (item, monitor) => {
        if (type === "calculatorItem") {
          return true;
        } else {
          if (hoverPositionRef) {
            hoverPositionRef.current.orderNumber = undefined;
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

  drag(drop(ref));

  return (
    <StyledDragBlock
      ref={ref}
      hasHoverTop={
        /* canDrop && */ Number(currIndex) ===
        Number(hoverPositionRef?.current.orderNumber)
      }
      hasHoverBottom={
        /* canDrop && */ Number(currIndex) + 1 ===
        Number(hoverPositionRef?.current.orderNumber)
      }
    >
      {getCalculator(name, hasHover, view, hasBorder)}
    </StyledDragBlock>
  );
};
