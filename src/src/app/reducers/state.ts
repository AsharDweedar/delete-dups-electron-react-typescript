import { TodoModel, PathModel, ExtModel} from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
  todos: RootState.TodoState;
  paths: RootState.PathState;
  extensions: RootState.ExtState;
  router: RouterState;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type PathState = PathModel[];
  export type ExtState = ExtModel[];
}
