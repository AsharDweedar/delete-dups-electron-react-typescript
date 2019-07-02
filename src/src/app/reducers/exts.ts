import { handleActions } from "redux-actions";
import { RootState } from "./state";
import { ExtActions } from "app/actions/extensions";
import { ExtModel } from "app/models";

const initialState: RootState.ExtState = [
  {
    id: 1,
    ext: ".png",
    sensitive: true,
  },
];

export const extReducer = handleActions<RootState.ExtState, ExtModel>(
  {
    [ExtActions.Type.ADD_EXT]: (state, action) => {
      if (action.payload && action.payload.ext != "") {
        let list = state.length == 1 && state[0]["id"] == -1 ? [] : state;
        return [
          ...list,
          { id: list.length + 1, sensitive: true, ext: action.payload.ext },
        ];
      } else {
        return state;
      }
    },
    [ExtActions.Type.DELETE_EXT]: (state, action) => {
      var id = (action["payload"] || { id: -1 })["id"];
      state = state.filter(ext => ext.id !== id);
      return state.length
        ? state.map((ele, i) => {
            return { ...ele, id: i };
          })
        : initialState;
    },
    [ExtActions.Type.TOGGLE_SENSITIVE]: (state, action) => {
      return state.map(
        ext =>
          ext.id === (action.payload as any)
            ? { ...ext, sensitive: !ext.sensitive }
            : ext
      );
    },
  },
  initialState
);
