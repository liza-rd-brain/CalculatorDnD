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

const StyledDragBlock = styled.div``;

type DragProps = {
  id: string;
  name: CalculatorItemName;
  view: CalculatorItemView;
  type: DragType;
  itemIndex?: number;
};

type DropResult = {
  name: CalculatorItemName;
};

const getCalculator = (name: CalculatorItemName) => {
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
  itemIndex,
}) => {
  // console.log("type", type);
  const { state, dispatch } = useAppContext();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: type,
      item: { id, index: itemIndex },
      end: (item, monitor) => {
        //DEPENDS WHAT AND FROM WHERE DRAG
        const dropResult = monitor.getDropResult<DropResult>();
        console.log("dropResult", dropResult);
        if (item && dropResult) {
          console.log(`You dropped ${item.id} into ${dropResult.name}!`);
          dispatch({ type: "draggedItem", payload: { id: id, type: type } });
        }
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      canDrag: () => {
        console.log("canDrag", view === "active");
        return view === "active";
      },
    }),
    [state.sideBar]
  );

  const [{ isOver, handlerId }, drop] = useDrop(() => ({
    accept: ItemDragType.CALCULATOR_ITEM,
    drop: () => ({ name: "drop container" }),
    hover: (item: { id: string; index: number }, monitor) =>
      console.log("hover index", item.index),
    /*  drop: () => dispatch({ type: "dropItem" }), */
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  drag(drop(ref));

  return <StyledDragBlock ref={ref}>{getCalculator(name)}</StyledDragBlock>;
};
