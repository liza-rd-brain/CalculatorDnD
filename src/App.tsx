import styled from "styled-components";
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

const App = () => {
  return (
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
  );
};

export default App;
