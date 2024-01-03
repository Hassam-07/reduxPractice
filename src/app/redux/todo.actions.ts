// export interface Action {
//   type: string;
//   payload?: { [key: string]: any };
// }

// export interface Action {
//   type: string;
//   payload?: { [key: string]: any };
// }

// export const ADD_TODO = (todo: string): Action => ({
//   type: 'ADD_TODO',
//   payload: { todo },
// });

// export const DELETE_TODO = (id: string): Action => ({
//   type: 'DELETE_TODO',
//   payload: { id },
// });

// export const UPDATE_TODO = (id: string): Action => ({
//   type: 'UPDATE_TODO',
//   payload: { id },
// });
// export const EDIT_TODO = (id: string, todo: string): Action => ({
//   type: 'EDIT_TODO',
//   payload: { id, todo },
// });
// export const CLEAR_COMPLETED_TODO = (Todo: string): Action => ({
//   type: 'CLEAR_COMPLETED_TODO',
//   payload: { Todo },
// });

import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';
import { TodosState } from './reducer';

export const ADD_TODO = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>()
);
export const todoAdded = createAction(
  '[Todo/API] added todo Success',
  props<{ todo: Todo }>()
);
export const todoAddedFailure = createAction(
  '[Todo/API] added todo Failure',
  props<{ error: any }>()
);

export const DELETE_TODO = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);
export const todoDeleted = createAction(
  '[Todo/API] todo deleted Success',
  props<{ id: number }>()
);
export const todoDeletedFailure = createAction(
  '[Todo/API] todo deleted Failure',
  props<{ error: any }>()
);

export const UPDATE_TODO = createAction(
  '[Todo] Update Todo',
  props<{ id: number }>()
);
export const markAsCompleted = createAction(
  '[Todo/API] mark as completed Success',
  props<{ id: number }>()
);
export const markAsCompletedFailure = createAction(
  '[Todo/API] mark as completed Failure',
  props<{ error: any }>()
);

export const EDIT_TODO = createAction(
  '[Todo] Edit Todo',
  props<{ id: number; todo: string }>()
);
export const todoToBeEdit = createAction(
  '[Todo/API] todo to be Edited',
  props<{ id: number; todo: string }>()
);
export const todoEditFailure = createAction(
  '[Todo/API] todo Edited Failure',
  props<{ error: any }>()
);

export const CLEAR_COMPLETED_TODO = createAction(
  '[Todo] Clear Completed Todo',
  props<{ id: number }>()
);
export const CLEAR_COMPLETED_TODO_SUCCESS = createAction(
  '[Todo/API] Clear Completed Todo Successful',
  props<{ id: number }>()
);
export const CLEAR_COMPLETED_TODO_FAILURE = createAction(
  '[Todo/API] Clear Completed Todo Failure',
  props<{ error: any }>()
);

export const SET_FILTER = createAction(
  '[Todo] Set Filter',
  props<{ filter: 'all' | 'active' | 'completed' }>()
);

export const enterTodosPage = createAction('[Todo] Enter ');
export const setTodo = createAction(
  '[Todo] setTodo',
  props<{ todo: Todo[] }>()
);
// export function LOCAL_STORAGE_UPDATE(arg0: { todos: Todo[] }) {
//   throw new Error('Function not implemented.');
// }

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodos = createAction('[Todo] load todo ');
export const FailLoadTodos = createAction('[Todo]Fail load todo ');
export const loadTodosFail = createAction(
  '[Todo] Load Todos Fail',
  props<{ errorMessage: string }>()
);

export const removeErrorModal = createAction('[Error] Clear Error');
