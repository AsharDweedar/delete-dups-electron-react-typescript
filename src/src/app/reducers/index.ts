import { combineReducers } from 'redux';
import { RootState } from './state';
import { pathReducer } from './paths';
import { extReducer } from './exts';
import { routerReducer, RouterState } from 'react-router-redux';

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  router: routerReducer as any,
  paths: pathReducer as any,
  extensions: extReducer as any,
});
