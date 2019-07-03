import { handleActions } from "redux-actions";
import { RootState } from "./state";
import { ExtActions } from "app/actions";
import { ExtModel } from "app/models";

const initialState: RootState.ExtState = [
  {
    id: 1,
    ext: ".png",
    sensitive: true,
  },
];

function validExt(ext: string) {
  return ext.length > 0 && ext[0] == ".";
}

export const extReducer = handleActions<RootState.ExtState, ExtModel>(
  {
    [ExtActions.Type.ADD_EXT]: (state, action) => {
      if (action.payload && action.payload.ext != "") {
        let filtered = state.filter(
          ({ ext }) => (action.payload || { ext: "" }).ext == ext
        );
        if (filtered.length && validExt(action.payload.ext)) return state;

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
