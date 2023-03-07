type AppPhase = "constructor" | "calculator";

export type State = {
  phase: AppPhase;
};

export type ActionType =
  | { type: "dropItem" }
  | { type: "test" }
  | { type: "copyItem"; payload: string };
