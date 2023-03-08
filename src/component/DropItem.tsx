import { FC, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import { useAppContext } from "../App.provider";
import { ItemDragTypes } from "../App";
import { CalculatorItem } from "../business/types";

const StyledDropBlock = styled.div`
  width: 240px;
  height: 480px;
`;

type DropItemProps = {
  calculatorList: JSX.Element[];
};

export const DropItem: FC<DropItemProps> = ({ calculatorList }) => {
  const { dispatch } = useAppContext();
  const ref = useRef(null);

  const [{ isOver, handlerId }, drop] = useDrop(() => ({
    accept: ItemDragTypes.CONSTRUCTOR_ITEM,
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
