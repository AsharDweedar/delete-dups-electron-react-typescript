import { createAction } from 'redux-actions';
import { PathModel } from 'app/models';

export namespace PathActions {
    export enum Type {
        ADD_PATH = 'ADD_PATH',
        // EDIT_TODO = 'EDIT_TODO',
        DELETE_PATH = 'DELETE_PATH',
        TOGGLE_RECURS = 'TOGGLE_RECURS',
        TOGGLE_SCAN_COMPLETED = 'TOGGLE_SCAN_COMPLETED'
        // CLEAR_COMPLETED = 'CLEAR_COMPLETED'
    }

    export const addTodo = createAction<PartialPick<PathModel, 'path'>>(Type.ADD_PATH);
    // export const editTodo = createAction<PartialPick<PathModel, 'id'>>(Type.EDIT_TODO);
    export const deleteTodo = createAction<PathModel['id']>(Type.DELETE_PATH);
    export const completeTodo = createAction<PathModel['id']>(Type.TOGGLE_RECURS);
    export const completeAll = createAction<PathModel['id']>(Type.TOGGLE_SCAN_COMPLETED);
    // export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
}

export type PathActions = Omit<typeof PathActions, 'Type'>;
