import { createAction } from "redux-actions";
import { RootState } from "../reducers/state";

export namespace ProcessActions {
  export enum Type {
    SCAN_PROGRESS = "SCAN_PROGRESS",
    SCANNING_START = "SCANNING_START",
  }

  export const toggleScanOnGoing = createAction<RootState>(Type.SCANNING_START);
  export const changeScanProgress = createAction<RootState>(Type.SCAN_PROGRESS);
}

export type ProcessActions = Omit<typeof ProcessActions, "Type">;
