import { FC } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import { ItemDragTypes } from "../App";

const StyledDropBlock = styled.div`
  width: 240px;
  height: 480px;
`;

export const DropItem = () => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemDragTypes.CONSTRUCTOR_ITEM,
    drop: () => console.log("drop"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),

    hover: () => {
      console.log("hover");
    },
  }));
  return <StyledDropBlock ref={drop} />;
};
