import { FC } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import { useAppContext } from "../App.provider";
import { ItemDragTypes } from "../App";

const StyledDropBlock = styled.div`
  width: 240px;
  height: 480px;
`;

export const DropItem = () => {
  const { dispatch } = useAppContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemDragTypes.CONSTRUCTOR_ITEM,
    drop: () => ({ name: "drop container" }),
    /*  drop: () => dispatch({ type: "dropItem" }), */
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),

    hover: () => {
      // console.log("hover");
    },
  }));
  return <StyledDropBlock ref={drop} />;
};
