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
      console.log("state inside the dispatched action ", state);
      let newState = { ...state, scanOnGoing: !state["scanOnGoing"] };
      console.log("state inside the dispatched action ", newState);
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
