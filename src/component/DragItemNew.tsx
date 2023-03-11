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
    underlineLevel: string | undefined;
    testProperty?: any;
    elemWithUnderline: HTMLDivElement | undefined;
  }>;
  hasBorder?: boolean;
};

type DropResult = {
  name: CalculatorItemName;
};

const getCalculator = (
  name: CalculatorItemName,
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

export const DragItemNew: FC<DragProps> = ({
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

  //НА КАКОЙ ПОРЯДОК ВСТАНЕТ ЭТОТ ЭЛЕМЕНТ
  //! draggingNewIndex dragging element
  const draggingNewIndex = useRef<number | undefined>(undefined);

  // console.log(hoverItemInfo);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: type,
      item: { id, name, index: currIndex, containerType: type },
      end: (item, monitor) => {
        // if (hoverItemInfo) {
        //   console.log(hoverItemInfo.current);
        // }
        // console.log("remove all underline");

        const dropResult = monitor.getDropResult<any>();
        /**
         * drop item from constructor =copy
         *  drop item from calculator =sort
         * cannot drop on the same elem
         */
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
          // hoverItemInfo.current.underlineLevel = undefined;
          // hoverItemInfo.current.testProperty = false;
        }

        if (typeof draggingNewIndex.current === "number") {
          return { index: draggingNewIndex };
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
        // console.log(hoverItemInfo);
        //*Избежать ненужных вычислений
        // if (draggingNewIndex.current === item.index) {
        //   return;
        // }
        // if (
        //   hoverItemInfo?.current.elemWithUnderline === dragNodeRef.current &&
        //   draggingNewIndex.current !== item.index
        // ) {
        //   // console.log("не новый элемент");
        //   // console.log(hoverItemInfo?.current.elemWithUnderline);
        //   // console.log(dragNodeRef.current);
        //   return;
        // } else {
        //   console.log("перерисовка");
        // }

        if (
          !dragNodeRef.current ||
          typeof currIndex !== "number" ||
          !hoverItemInfo
        ) {
          return;
        }
        //! назначаем индекс элементу, который тащим
        draggingNewIndex.current = currIndex;

        const hoverBoundingRectDrop =
          dragNodeRef.current.getBoundingClientRect();

        //! middle of hover element
        const dropMiddleYCoord =
          hoverBoundingRectDrop.y + hoverBoundingRectDrop.height / 2;

        const coordDragY = monitor.getClientOffset()?.y as number;

        const dragIndex = item.index;
        const hoverIndex = draggingNewIndex.current;

        const isAboveMiddle = coordDragY - dropMiddleYCoord < 0;
        const underlayType = isAboveMiddle ? "top" : "bottom";

        //!where pull from constructor there is no overlap
        const targetIsNotDropEl =
          item.containerType === "constructorItem" || dragIndex !== hoverIndex;

        if (
          (hoverItemInfo?.current.elemWithUnderline === dragNodeRef.current &&
            draggingNewIndex.current !== item.index &&
            underlayType === hoverItemInfo?.current.underlineLevel) ||
          !targetIsNotDropEl
        ) {
          return;
        } else {
          console.log("перерисовка");
        }

        const pullDown = dragIndex < hoverIndex;

        const hasHoverBottom = targetIsNotDropEl && !isAboveMiddle;

        const hasHoverTop = targetIsNotDropEl && isAboveMiddle;

        // //* очищаем предыдущее подчеркивание
        if (hoverItemInfo.current.elemWithUnderline) {
          hoverItemInfo.current.elemWithUnderline.style.backgroundImage =
            "none";
        }

        if (hasHoverTop) {
          // console.log(dragNodeRef.current);
          dragNodeRef.current.style.backgroundImage = `url(${separator})`;
          dragNodeRef.current.style.backgroundPosition = "top";
        } else if (hasHoverBottom) {
          dragNodeRef.current.style.backgroundImage = `url(${separator})`;
          dragNodeRef.current.style.backgroundPosition = "bottom";
        } else {
          dragNodeRef.current.style.backgroundImage = "none";
        }

        ///* Сохраняю элемент, который тяну!!!!/
        hoverItemInfo.current.elemWithUnderline = dragNodeRef.current;
        hoverItemInfo.current.underlineLevel = isAboveMiddle ? "top" : "bottom";
      },

      canDrop: (item, monitor) => {
        if (type === "calculatorItem") {
          return true;
        } else {
          if (hoverItemInfo) {
            // hoverItemInfo.current.underlineLevel = undefined;
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

  drag(drop(dragNodeRef));

  return (
    <StyledDragBlock ref={dragNodeRef}>
      {getCalculator(name, view, hasBorder)}
    </StyledDragBlock>
  );
};
