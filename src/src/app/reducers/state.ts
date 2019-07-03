import { PathModel, ExtModel, OptModel } from "app/models";
import { RouterState } from 'react-router-redux';

export interface RootState {
  paths: RootState.PathState;
  exts: RootState.ExtState;
  opts: RootState.OptState;
  router: RouterState;
}

export namespace RootState {
  export type PathState = PathModel[];
  export type ExtState = ExtModel[];
  export type OptState = OptModel[];
}
