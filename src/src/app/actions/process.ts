import { createAction } from "redux-actions";
import { RootState } from "app/reducers/state";

export namespace ProcessActions {
  export enum Type {
    SCANNING_STATUS = "SCANNING_STATUS",
  }

  export const togglescanOnGoing = createAction<RootState>(
    Type.SCANNING_STATUS
  );
}

export type ProcessActions = Omit<typeof ProcessActions, "Type">;
