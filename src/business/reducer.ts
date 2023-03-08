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
    case "draggedItem": {
      switch (action.payload.type) {
        case "calculatorItem": {
          return state;
        }
        case "constructorItem": {
          const newCalculatorItem: CalculatorItem = state.sideBar.find(
            (calculatorItem) => calculatorItem.name === action.payload.id
          ) as CalculatorItem;

          const newSideBar: CalculatorItem[] = state.sideBar.map(
            (sideBarItem) => {
              if (sideBarItem.name === action.payload.id) {
                return { ...sideBarItem, view: "disable" };
              } else {
                return sideBarItem;
              }
            }
          );

          const newCanvas = [...state.canvas, newCalculatorItem];
          const newState = { ...state, canvas: newCanvas, sideBar: newSideBar };
          console.log("newState", newState);
          return newState;
        }
        default: {
          return state;
        }
      }
    }

    default:
      return state;
  }
};
