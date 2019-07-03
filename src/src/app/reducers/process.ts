import { handleActions } from "redux-actions";
import { RootState } from "./state";
import { ProcessActions } from "app/actions";

import Scanner from "app/Functionality/scanner";

const initialState: RootState.ProcessState = {
  scanOnGoing: false,
};

export const processReducer = handleActions<RootState.ProcessState, RootState>(
  {
    [ProcessActions.Type.SCANNING_STATUS]: (state, action) => {
      Scanner(action["payload"]);

      return {
        ...state,
        scanOnGoing: !state["scanOnGoing"],
      };
    },
  },
  initialState
);
