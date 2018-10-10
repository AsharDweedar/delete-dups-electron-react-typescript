import { TodoModel, PathModel} from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
  todos: RootState.TodoState;
  paths: RootState.PathState;
  router: RouterState;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type PathState = PathModel[];
}
