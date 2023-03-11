import { ActionType, CalculatorItem, State } from "./types";

export const initialState: State = {
  phase: "constructor",
  sideBar: [
    { name: "display", view: "active" },
    { name: "operationList", view: "active" },
    { name: "numberPanel", view: "active" },
    { name: "equalSign", view: "active" },
  ],
  canvas: [],
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case "copyItem": {
      //TODO: took out like separate function
      const newCalculatorItem: CalculatorItem = state.sideBar.find(
        (calculatorItem) => calculatorItem.name === action.payload.name
      ) as CalculatorItem;

      const newSideBar: CalculatorItem[] = state.sideBar.map((sideBarItem) => {
        if (sideBarItem.name === action.payload.name) {
          return { ...sideBarItem, view: "disable" };
        } else {
          return sideBarItem;
        }
      });

      const newCanvas = [...state.canvas, newCalculatorItem];
      const newState = { ...state, canvas: newCanvas, sideBar: newSideBar };
      console.log(newState);
      return newState;
    }

    case "sortItem": {
      const { initIndex, draggingNewIndex: newIndex } = action.payload;
      const isShiftForward = initIndex < newIndex;

      const newCanvas = state.canvas.reduce(
        (
          prevCanvasList: CalculatorItem[],
          canvasItem: CalculatorItem,
          canvasItemIndex: number
        ) => {
          if (canvasItemIndex === initIndex) {
            return prevCanvasList;
          } else if (canvasItemIndex === newIndex) {
            if (isShiftForward) {
              return [...prevCanvasList, canvasItem, state.canvas[initIndex]];
            } else {
              return [...prevCanvasList, state.canvas[initIndex], canvasItem];
            }
          } else {
            return [...prevCanvasList, canvasItem];
          }
        },
        []
      );

      const newState = { ...state, canvas: newCanvas };
      return newState;
    }

    default:
      return state;
  }

  console.log(state);
};
