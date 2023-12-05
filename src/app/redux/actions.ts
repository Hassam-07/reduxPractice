import { Todo } from '../models/Todo';

export interface Action {
  type: string;
  payload?: { [key: string]: any };
}

// Action Creator Functions

// export const INCREMENT = { type: 'INCREMENT' };
// export const DECREMENT = { type: 'DECREMENT' };
// export const RESET = { type: 'RESET' };

// export const addTodo = { type: '[Todo] Add Todo' };
// export const deleteTodo = { type: '[Todo] Delete Todo' };
// export const updateTodo = { type: '[Todo] Update Todo' };

// export const togglePin = { type: '[Todo] Toggle Pin' };
// export const markAsComplete = { type: '[Todo] Mark as Complete' };
// export const clearCompleted = { type: '[Todo] Clear Completed' };

export enum TodosActionTypes {
  AddTodo = '[Todo] Add Todo',
  DeleteTodo = '[Todo] Delete Todo',
  UpdateTodo = '[Todo] Update Todo',
  TogglePin = '[Todo] Toggle Pin',
  MarkAsComplete = '[Todo] Mark as Complete',
  ClearCompleted = '[Todo] Clear Completed',
}

export class AddTodo implements Action {
  readonly type = TodosActionTypes.AddTodo;
  constructor(public payload: { todo: Todo }) {}
}

export class DeleteTodo implements Action {
  readonly type = TodosActionTypes.DeleteTodo;
  constructor(public payload: { id: number }) {}
}

export class UpdateTodo implements Action {
  readonly type = TodosActionTypes.UpdateTodo;
  constructor(public payload: { id: number; todo: Todo }) {}
}

export class TogglePin implements Action {
  readonly type = TodosActionTypes.TogglePin;
  constructor(public payload: { id: number }) {}
}

export class MarkAsComplete implements Action {
  readonly type = TodosActionTypes.MarkAsComplete;
  constructor(public payload: { id: number; complete: boolean }) {}
}

export class ClearCompleted implements Action {
  readonly type = TodosActionTypes.ClearCompleted;
}

export type TodosActionsUnion =
  | AddTodo
  | DeleteTodo
  | UpdateTodo
  | TogglePin
  | MarkAsComplete
  | ClearCompleted;
