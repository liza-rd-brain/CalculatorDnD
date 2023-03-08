import { useReducer } from "react";
import styled from "styled-components";

import { initialState, reducer } from "./business/reducer";
import { AppContext } from "./App.provider";
import { DragItem } from "./component/DragItem";
import { DropItem } from "./component/DropItem";

import ExampleFirst from "./example/first/example";
import ExampleSecond from "./example/second/example";

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
  height: 480px;
  /* border: 3px solid #70bb3e; */
  display: flex;
  gap: 26px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DropContainer = styled.div`
  width: 50%;
  height: 480px;
  border: 2px dashed #c4c4c4;
  display: flex;
  justify-content: center;
`;

export const ItemDragType = {
  CONSTRUCTOR_ITEM: "constructorItem",
  CALCULATOR_ITEM: "calculatorItem",
} as const;

type KeysDrag = keyof typeof ItemDragType;
export type DragType = (typeof ItemDragType)[KeysDrag];

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dragList = state.sideBar.map((constructorItem) => {
    return (
      <DragItem
        id={constructorItem.name}
        name={constructorItem.name}
        key={constructorItem.name}
        view={constructorItem.view}
        type={ItemDragType.CONSTRUCTOR_ITEM}
      />
    );
  });

  const calculatorList = state.canvas.length
    ? state.canvas.map((constructorItem, index) => {
        return (
          <DragItem
            id={constructorItem.name}
            name={constructorItem.name}
            key={constructorItem.name}
            view={constructorItem.view}
            type={ItemDragType.CALCULATOR_ITEM}
            itemIndex={index}
          />
        );
      })
    : [];

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledContainer>
        <DragContainer>{dragList}</DragContainer>
        <DropContainer>
          {/*       drop here */}
          <DropItem calculatorList={calculatorList}></DropItem>
        </DropContainer>

        <ExampleFirst />
      </StyledContainer>
    </AppContext.Provider>
  );
};
