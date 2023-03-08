import { useReducer } from "react";
import styled from "styled-components";

import { initialState, reducer } from "./business/reducer";
import { AppContext } from "./App.provider";
import { DragItem } from "./component/DragItem";
import { DropItem } from "./component/DropItem";

import Example from "./example/example";

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
  border: 3px solid #70bb3e;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const DropContainer = styled.div`
  width: 240px;
  height: 480px;
  border: 3px solid gold;
`;

export const ItemDragTypes = {
  CONSTRUCTOR_ITEM: "constructorItem",
};

export const APP_DATA = {};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dragList = state.sideBar.map((constructorItem) => {
    return (
      <DragItem
        id={constructorItem.name}
        name={constructorItem.name}
        key={constructorItem.name}
        view={constructorItem.view}
      />
    );
  });

  const calculatorList = state.canvas.length
    ? state.canvas.map((constructorItem) => {
        return (
          <DragItem
            id={constructorItem.name}
            name={constructorItem.name}
            key={constructorItem.name}
            view={constructorItem.view}
          />
        );
      })
    : [];

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledContainer>
        <DragContainer>{dragList}</DragContainer>
        <DropContainer>
          drop here
          <DropItem calculatorList={calculatorList}></DropItem>
        </DropContainer>

        <Example />
      </StyledContainer>
    </AppContext.Provider>
  );
};
