import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ExtActions } from 'app/actions/extensions';
import { ExtModel } from 'app/models';

const initialState: RootState.ExtState = [
  {
    id: 1,
    ext: '.png',
    sensitive: true,
  },
];

export const extReducer = handleActions<RootState.ExtState, ExtModel>(
  {
    [ExtActions.Type.ADD_EXT]: (state, action) => {
      if (action.payload && action.payload.ext) {
        return [
          {
            id: state.reduce((max, ext) => Math.max(ext.id || 1, max), 0) + 1,
            sensitive: true,
            ext: action.payload.ext,
          },
          ...state,
        ];
      } else {
        return state;
      }
    },
    [ExtActions.Type.DELETE_EXT]: (state, action) => {
      return state.filter(ext => ext.id !== (action.payload as any));
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
