import { FC } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

import { useAppContext } from "../App.provider";
import { ItemDragTypes } from "../App";
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

export const DragItem: FC<DragProps> = ({ id, name, view }) => {
  const { state, dispatch } = useAppContext();
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemDragTypes.CONSTRUCTOR_ITEM,
      item: { id },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          console.log(`You dropped ${item.id} into ${dropResult.name}!`);
          dispatch({ type: "copyItem", payload: id });
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
