import { useReducer, useRef } from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

import { initialState, reducer } from "./business/reducer";
import { AppContext } from "./App.provider";
// import { DragItem } from "./component/DragItem";
import { DragItemNew } from "./component/DragItemNew";
import { DropItem } from "./component/DropItem";

import ExampleFirst from "./example/first/example";

const StyledContainer = styled.div`
  width: 800px;
  height: 640px;
  border: 1px solid #000;
  margin: 200px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DragContainer = styled.div`
  width: 50%;
  height: 448px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DropContainer = styled.div`
  width: 50%;
  height: 448px;
  /* border: 2px dashed #c4c4c4; */
  display: flex;
  justify-content: center;
  margin: 20px 0;
  box-sizing: border-box;
  /* & > * > :last-child {
    box-sizing: border-box;
    margin-bottom: auto;
  } */
`;

export const ItemDragType = {
  CONSTRUCTOR_ITEM: "constructorItem",
  CALCULATOR_ITEM: "calculatorItem",
} as const;

type KeysDrag = keyof typeof ItemDragType;
export type DragType = (typeof ItemDragType)[KeysDrag];

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const hoverItemInfo = useRef<{
    underlineLevel: number | undefined;
    testProperty?: any;
    elemWithUnderline: HTMLDivElement | undefined;
  }>({
    underlineLevel: undefined,
    testProperty: undefined,
    elemWithUnderline: undefined,
  });

  const dragList = state.sideBar.map((constructorItem) => {
    return (
      <DragItemNew
        id={`${constructorItem.name}${ItemDragType.CONSTRUCTOR_ITEM}`}
        name={constructorItem.name}
        key={constructorItem.name}
        view={constructorItem.view}
        type={ItemDragType.CONSTRUCTOR_ITEM}
        hasBorder={true}
      />
    );
  });

  const getCalculatorList = (ref: React.RefObject<HTMLDivElement>) => {
    const calculatorList = state.canvas.length
      ? state.canvas.map((constructorItem, index) => {
          return (
            <DragItemNew
              id={`${constructorItem.name}${ItemDragType.CALCULATOR_ITEM}`}
              name={constructorItem.name}
              key={constructorItem.name}
              view={constructorItem.view}
              type={ItemDragType.CALCULATOR_ITEM}
              currIndex={index}
              hoverItemInfo={hoverItemInfo}
            />
          );
        })
      : [];
    return calculatorList;
  };
  const [{}, drop] = useDrop(() => ({
    accept: ItemDragType.CONSTRUCTOR_ITEM,
    canDrop: () => false,

    collect: (monitor) => ({
      canDrop: !monitor.canDrop(),
    }),
    hover: () => {
      if (hoverItemInfo) {
        hoverItemInfo.current.underlineLevel = undefined;
        hoverItemInfo.current.testProperty = false;
      }
    },
    drop: () => {
      if (hoverItemInfo) {
        hoverItemInfo.current.underlineLevel = undefined;
        hoverItemInfo.current.testProperty = false;
      }
    },
  }));

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledContainer>
        <DragContainer ref={drop}>{dragList}</DragContainer>
        <DropContainer>
          {/*       drop here */}
          <DropItem
            getCalculatorList={getCalculatorList}
            hoverItemInfo={hoverItemInfo}
          ></DropItem>
        </DropContainer>

        {/* <ExampleFirst /> */}
      </StyledContainer>
    </AppContext.Provider>
  );
};
