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

const StyledDragBlock = styled.div<{ hasHover: boolean }>`
  position: relative;
  border-bottom: ${({ hasHover }) => {
    if (hasHover) {
      return "1px solid #5D5FEF";
    } else {
      return "none";
    }
  }};
  padding-bottom: ${({ hasHover }) => {
    if (hasHover) {
      return "8px";
    } else {
      return "none";
    }
  }};

  //TODO: took out common
  &:before {
    content: "";
    display: ${({ hasHover }) => {
      if (hasHover) {
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
    bottom: -2px;
    left: -3px;
    z-index: 1;
  }
  &:after {
    content: "";
    display: ${({ hasHover }) => {
      if (hasHover) {
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
    bottom: -2px;
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
  hoverRef?: React.MutableRefObject<{
    orderNumber: number | undefined;
  }>;

  refDropOverlay?: React.RefObject<HTMLDivElement>;
};

type DropResult = {
  name: CalculatorItemName;
};

const getCalculator = (name: CalculatorItemName, hasHover: boolean) => {
  switch (name) {
    case "display": {
      return <Display />;
    }
    case "operationList": {
      return <OperationList />;
    }

    case "numberPanel": {
      return <NumberPanel />;
    }
    case "equalSign": {
      return <EqualSign />;
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
  hoverRef,
  refDropOverlay,
}) => {
  const { state, dispatch } = useAppContext();
  const ref = useRef<HTMLDivElement>(null);
  //НА КАКОЙ ПОРЯДОК ВСТАНЕТ ЭТОТ ЭЛЕМЕНТ
  const newIndex = useRef<number | undefined>(undefined);

  if (Number(currIndex) === Number(hoverRef?.current.orderNumber)) {
    // console.log("draw hover line");
  }

  const hasHover = Number(currIndex) === Number(hoverRef?.current.orderNumber);
  if (hasHover) {
    console.log(hasHover);
  }

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: type,
      item: { id, index: currIndex },
      end: (item, monitor) => {
        /* 2: Get this index here! */
        // eslint-disable-next-line

        if (hoverRef) {
          console.log("hoverEnd");
          hoverRef.current.orderNumber = undefined;
        }

        const dropResult = monitor.getDropResult<any>();

        if (item && dropResult && type === "constructorItem") {
          dispatch({ type: "copyItem", payload: { id: id, type: type } });
        } else if (
          item &&
          type === "calculatorItem" &&
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
        if (hoverRef) {
          console.log("endOfDrop");
          hoverRef.current.orderNumber = undefined;
        }

        if (typeof newIndex.current === "number") {
          return { index: newIndex };
        }
      },

      hover: (item: { id: CalculatorItemName; index: number }, monitor) => {
        if (!canDrop && type === "constructorItem") {
          if (hoverRef) {
            console.log("un draw hover line");
            hoverRef.current.orderNumber = undefined;
          }
        }
        newIndex.current = currIndex as number;
      },

      canDrop: (item, monitor) => {
        if (type === "calculatorItem") {
          return true;
        } else {
          if (hoverRef) {
            hoverRef.current.orderNumber = undefined;
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

  /*   console.log(hasHover, currIndex); */

  // if (newIndex) {
  //   refDropOverlay && drag(drop(refDropOverlay));
  // } else {
  //   drag(drop(ref));
  // }

  drag(drop(ref));

  return (
    <StyledDragBlock
      ref={ref}
      hasHover={
        /* canDrop && */ Number(currIndex) ===
        Number(hoverRef?.current.orderNumber)
      }
    >
      {getCalculator(name, hasHover)}
    </StyledDragBlock>
  );
};
