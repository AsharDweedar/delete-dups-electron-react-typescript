import { handleActions } from "redux-actions";

import { RootState } from "./state";
import { ProcessActions } from "../actions";

const initialState: RootState.ProcessState = {
  scanOnGoing: false,
  progress: 0,
};

export const processReducer = handleActions<RootState.ProcessState, RootState>(
  {
    [ProcessActions.Type.SCANNING_START]: (state, action) => {
      let newState = { ...state, scanOnGoing: !state["scanOnGoing"] };
      return newState;
    },
    [ProcessActions.Type.SCAN_PROGRESS]: (state, action) => {
      if (action.payload) {
        let progress = action.payload["process"]["progress"];
        let allPAths = action.payload["paths"].length;
        console.log("progress: ", progress);

        return {
          ...state,
          scanOnGoing: progress / allPAths != 1,
          progress: progress,
        };
      } else {
        return state;
      }
    },
  },
  initialState
);
