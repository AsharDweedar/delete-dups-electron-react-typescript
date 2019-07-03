import { handleActions } from "redux-actions";
import { RootState } from "./state";
import { OptActions } from "app/actions";
import { OptModel } from "app/models";

const initialState: RootState.OptState = [
  {
    id: 0,
    name: "delete_duplicates",
    message: "should delete duplicates once found?",
    enabled: true,
  },
  {
    id: 1,
    name: "prioritized_delete",
    message: "should delete according to priorities?",
    enabled: false,
  },
];

export const optReducer = handleActions<RootState.OptState, OptModel>(
  {
    [OptActions.Type.UPDATE_OPTIONS]: (state, action) => {
      return state.map(function(opt: OptModel) {
        return (action["payload"] || { id: -1 })["id"] == opt.id
          ? { ...opt, enabled: !opt["enabled"] }
          : opt;
      });
    },
  },
  initialState
);
