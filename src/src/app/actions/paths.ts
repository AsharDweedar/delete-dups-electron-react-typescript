import { createAction } from "redux-actions";
import { PathModel } from "app/models";

export namespace PathActions {
  export enum Type {
    ADD_PATH = "ADD_PATH",
    DELETE_PATH = "DELETE_PATH",
    TOGGLE_RECURS = "TOGGLE_RECURS",
    TOGGLE_SCAN_COMPLETED = "TOGGLE_SCAN_COMPLETED",
  }

  export const addPath = createAction<any>(
    Type.ADD_PATH
  );
  export const deletePath = createAction<PathModel["id"]>(Type.DELETE_PATH);
  export const togglePathRecursively = createAction<PathModel["id"]>(
    Type.TOGGLE_RECURS
  );
  export const completeAll = createAction(Type.TOGGLE_SCAN_COMPLETED);
}

export type PathActions = Omit<typeof PathActions, "Type">;
