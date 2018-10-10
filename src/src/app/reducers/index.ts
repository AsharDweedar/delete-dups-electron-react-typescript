import { combineReducers } from 'redux';
import { RootState } from './state';
import { todoReducer } from './todos';
import { pathReducer } from './paths';
import { routerReducer, RouterState } from 'react-router-redux';

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  todos: todoReducer as any,
  router: routerReducer as any,
  paths: pathReducer as any,
});
