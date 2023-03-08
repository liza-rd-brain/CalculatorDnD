import { FC } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

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

export const DragItem: FC<DragProps> = ({ id, name, view, type }) => {
  console.log("type", type);
  const { state, dispatch } = useAppContext();
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: type,
      item: { id },
      end: (item, monitor) => {
        //DEPENDS WHAT AND FROM WHERE DRAG
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          console.log(`You dropped ${item.id} into ${dropResult.name}!`);
          dispatch({ type: "draggedItem", payload: { id: id, type: type } });
        }
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      canDrag: () => {
        return view === "active";
      },
    }),
    [state.sideBar]
  );

  return (
    // <StyledDragBlock ref={isDragging ? dragPreview : drag}>
    //   {name}
    // </StyledDragBlock>
    <StyledDragBlock ref={isDragging ? dragPreview : drag}>
      {getCalculator(name)}
    </StyledDragBlock>
  );
};
