import { combineReducers } from "redux";
import { RootState } from "./state";
import { pathReducer } from "./paths";
import { extReducer } from "./exts";
import { optReducer } from "./opts";
import { processReducer } from "./process";
import { routerReducer, RouterState } from "react-router-redux";

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  router: routerReducer as any,
  paths: pathReducer as any,
  exts: extReducer as any,
  opts: optReducer as any,
  process: processReducer as any,
});
