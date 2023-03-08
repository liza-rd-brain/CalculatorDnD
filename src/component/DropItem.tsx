import { FC, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemDragType } from "../App";

import { useAppContext } from "../App.provider";

import { CalculatorItem } from "../business/types";

const StyledDropBlock = styled.div`
  width: 240px;
  height: 100%;
  display: flex;
  gap: 26px;
  flex-direction: column;
  align-items: center;
`;

type DropItemProps = {
  calculatorList: JSX.Element[];
};

export const DropItem: FC<DropItemProps> = ({ calculatorList }) => {
  const { state, dispatch } = useAppContext();

  console.log("TESTE");

  const [{ isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: [ItemDragType.CONSTRUCTOR_ITEM, ItemDragType.CALCULATOR_ITEM],
      hover: (item: { id: string; index: number }, monitor) =>
        console.log("hover index on DROP", item.index),
      /*  drop: () => dispatch({ type: "dropItem" }), */
      drop: () => console.log("made drop"),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: true,
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [state.canvas, state.sideBar]
  );
  return <StyledDropBlock ref={drop}>{calculatorList}</StyledDropBlock>;
};
