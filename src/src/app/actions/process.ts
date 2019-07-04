import { createAction } from "redux-actions";
import { RootState } from "../reducers/state";

export namespace ProcessActions {
  export enum Type {
    SCANNING_STATUS = "SCANNING_STATUS",
    SCANNING_START = "SCANNING_START",
  }

  export const togglescanOnGoing = createAction<RootState>(Type.SCANNING_START);
  export const checkScanStatus = createAction<RootState>(Type.SCANNING_STATUS);
}

export type ProcessActions = Omit<typeof ProcessActions, "Type">;
