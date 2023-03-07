import { FC } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

import { useAppContext } from "../App.provider";
import { ItemDragTypes } from "../App";
import { CalculatorItemView } from "../business/types";

const StyledDragBlock = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid #513ebb;
`;

type DragProps = {
  id: string;
  name: string;
  view: CalculatorItemView;
};

type DropResult = {
  name: string;
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
    <StyledDragBlock ref={isDragging ? dragPreview : drag}>
      {name}
    </StyledDragBlock>
  );
};
