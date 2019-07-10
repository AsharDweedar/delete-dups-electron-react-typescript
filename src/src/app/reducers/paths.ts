import { handleActions } from "redux-actions";
import { RootState } from "./state";
import { PathActions } from "app/actions";
import { PathModel } from "app/models";

const initialState: RootState.PathState = [
  {
    id: -1,
    path: "No Paths Selected",
    recursively: true,
    scan_completed: false,
  },
];

export const pathReducer = handleActions<RootState.PathState, PathModel>(
  {
    [PathActions.Type.ADD_PATH]: (state, action) => {
      if (action.payload && action.payload.path) {
        let filtered = state.filter(
          ({ path }) => (action.payload || { path: "" }).path == path
        );
        if (filtered.length) return state;
        let list = state.length == 1 && state[0]["id"] == -1 ? [] : state;
        return [
          ...list,
          {
            id: list.length + 1,
            scan_completed: false,
            recursively: true,
            path: action.payload.path,
          },
        ];
      } else {
        return state;
      }
    },
    [PathActions.Type.DELETE_PATH]: (state, action) => {
      var id = (action["payload"] || { id: -1 })["id"];
      state = state.filter(path => path.id !== id);
      return state.length
        ? state.map((ele, i) => {
            return { ...ele, id: i };
          })
        : initialState;
    },
    [PathActions.Type.TOGGLE_RECURS]: (state, action) => {
      return state.map(
        path =>
          path.id == (action.payload as any)
            ? { ...path, recursively: !path.recursively }
            : path
      );
    },
    [PathActions.Type.TOGGLE_SCAN_COMPLETED]: (state, action) => {
      let newPaths = state.map(
        path =>
          path.id == (action.payload || { id: -1 }).id
            ? { ...path, scan_completed: !path.scan_completed }
            : path
      );
      return newPaths;
    },
  },
  initialState
);
