import { ActionType, State } from "./types";

export const initialState: State = {
  phase: "constructor",
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case "test": {
      console.log("test");
      return state;
    }
    case "copyItem": {
      console.log(action.payload);
      return state;
    }

    default:
      return state;
  }
};
