import { createAction } from "redux-actions";

export namespace OptActions {
  export enum Type {
    UPDATE_OPTIONS = "UPDATE_OPTIONS"
  }

  export const updateOpt = createAction<object>(
    Type.UPDATE_OPTIONS
  );
}

export type OptActions = Omit<typeof OptActions, "Type">;
