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
  const { dispatch } = useAppContext();
  const ref = useRef(null);

  const [{ isOver, handlerId }, drop] = useDrop(() => ({
    accept: ItemDragType.CONSTRUCTOR_ITEM || ItemDragType.CALCULATOR_ITEM,
    drop: () => ({ name: "drop container" }),
    /*  drop: () => dispatch({ type: "dropItem" }), */
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),

    hover: (item, monitor) => {},
  }));
  return <StyledDropBlock ref={drop}>{calculatorList}</StyledDropBlock>;
};
