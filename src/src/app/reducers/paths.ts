import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { PathActions } from 'app/actions/paths';
import { PathModel } from 'app/models';

const initialState: RootState.PathState = [
  {
    id: 1,
    path: '/home',
    recursively: true,
    scan_completed: true,
  },
];

export const pathReducer = handleActions<RootState.PathState, PathModel>(
  {
    [PathActions.Type.ADD_PATH]: (state, action) => {
      if (action.payload && action.payload.path) {
        return [
          {
            id: state.reduce((max, path) => Math.max(path.id || 1, max), 0) + 1,
            scan_completed: false,
            recursively: true,
            path: action.payload.path,
          },
          ...state,
        ];
      } else {
        return state;
      }
    },
    [PathActions.Type.DELETE_PATH]: (state, action) => {
      return state.filter(path => path.id !== (action.payload as any));
    },
    [PathActions.Type.TOGGLE_RECURS]: (state, action) => {
      return state.map(
        path =>
          path.id === (action.payload as any)
            ? { ...path, recursively: !path.recursively }
            : path
      );
    },
    [PathActions.Type.TOGGLE_SCAN_COMPLETED]: (state, action) => {
      return state.filter(path => path.scan_completed === false);
    },
  },
  initialState
);
