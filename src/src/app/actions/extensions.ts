import { createAction } from 'redux-actions';
import { ExtModel } from 'app/models';

export namespace ExtActions {
  export enum Type {
    ADD_EXT = 'ADD_EXT',
    DELETE_EXT = 'DELETE_EXT',
    TOGGLE_SENSITIVE = 'TOGGLE_SENSITIVE',
  }

  export const addTodo = createAction<PartialPick<ExtModel, 'ext'>>(
    Type.ADD_EXT
  );
  export const deleteTodo = createAction<ExtModel['id']>(Type.DELETE_EXT);
  export const completeTodo = createAction<ExtModel['id']>(Type.TOGGLE_SENSITIVE);
}

export type ExtActions = Omit<typeof ExtActions, 'Type'>;
