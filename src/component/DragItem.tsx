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
  border-bottom: ${({ hasHover }) => {
    if (hasHover) {
      return "1px solid black";
    }
  }};
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
}) => {
  const { state, dispatch } = useAppContext();
  const ref = useRef<HTMLDivElement>(null);
  //НА КАКОЙ ПОРЯДОК ВСТАНЕТ ЭТОТ ЭЛЕМЕНТ
  const newIndex = useRef<number | undefined>(undefined);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: type,
      item: { id, index: currIndex },
      end: (item, monitor) => {
        /* 2: Get this index here! */
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

  const [{ isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: ItemDragType.CONSTRUCTOR_ITEM,
      drop: () => {
        if (typeof newIndex.current === "number") {
          return { index: newIndex };
        }
      },

      hover: (item: { id: CalculatorItemName; index: number }, monitor) => {
        /*  console.log("hover on DragItem", id); */
        newIndex.current = currIndex as number;
      },

      canDrop: (item, monitor) => {
        return type === "calculatorItem";
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [state.sideBar, state.canvas]
  );

  const hasHover = Number(currIndex) === Number(hoverRef?.current.orderNumber);

  console.log(hasHover, currIndex);

  drag(drop(ref));

  return (
    <StyledDragBlock
      ref={ref}
      hasHover={
        Number(currIndex) === Number(hoverRef?.current.orderNumber && isOver)
      }
    >
      {getCalculator(name, hasHover)}
    </StyledDragBlock>
  );
};
