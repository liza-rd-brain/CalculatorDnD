import { useReducer } from "react";
import styled from "styled-components";

import { initialState, reducer } from "./business/reducer";
import { AppContext } from "./App.provider";
import { DragItem } from "./component/DragItem";
import { DropItem } from "./component/DropItem";

const StyledContainer = styled.div`
  width: 625px;
  height: 640px;
  border: 1px solid #000;
  margin: 200px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DragContainer = styled.div`
  width: 240px;
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledContainer>
        <DragContainer>
          <DragItem id="1" />
          <DragItem id="2" />
          <DragItem id="3" />
        </DragContainer>
        <DropContainer>
          drop here
          <DropItem></DropItem>
        </DropContainer>
      </StyledContainer>
    </AppContext.Provider>
  );
};
