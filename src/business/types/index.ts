import { DragType } from "../../App";

type AppPhase = "constructor" | "calculator";

export type State = {
  phase: AppPhase;
  sideBar: Array<CalculatorItem>;
  canvas: CalculatorItem[];
};

export type CalculatorItemName =
  | "display"
  | "operationList"
  | "numberPanel"
  | "equalSign";

export type CalculatorItemView = "active" | "disable";

export type CalculatorItem = {
  name: CalculatorItemName;
  view: CalculatorItemView;
};

type IdItem = CalculatorItemName;

export type ActionType =
  | { type: "dropItem" }
  | { type: "test" }
  | { type: "copyItem"; payload: { id: IdItem; type: DragType } }
  | { type: "sortItem"; payload: { initIndex: number; newIndex: number } };
