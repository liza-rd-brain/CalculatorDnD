import { FC } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

import { useAppContext } from "../App.provider";
import { ItemDragTypes } from "../App";

const StyledDragBlock = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid #513ebb;
`;

type DragProps = {
  id: string;
};

type DropResult = {
  name: string;
};

export const DragItem: FC<DragProps> = ({ id }) => {
  const { dispatch } = useAppContext();
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemDragTypes.CONSTRUCTOR_ITEM,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log(`You dropped ${item.id} into ${dropResult.name}!`);
        dispatch({ type: "copyItem", payload: id });
      }
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return isDragging ? (
    <StyledDragBlock ref={dragPreview} />
  ) : (
    <StyledDragBlock ref={drag} />
  );
};
