import { FC } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

import { ItemDragTypes } from "../App";

const StyledDragBlock = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid #513ebb;
`;

type DragProps = {
  id: string;
};

export const DragItem: FC<DragProps> = ({ id }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemDragTypes.CONSTRUCTOR_ITEM,
    item: { id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return isDragging ? (
    <StyledDragBlock ref={dragPreview} />
  ) : (
    <StyledDragBlock ref={drag} />
  );
};
