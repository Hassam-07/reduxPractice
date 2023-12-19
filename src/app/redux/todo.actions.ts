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

export const DELETE_TODO = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

export const UPDATE_TODO = createAction(
  '[Todo] Update Todo',
  props<{ id: number }>()
);

export const EDIT_TODO = createAction(
  '[Todo] Edit Todo',
  props<{ id: number; todo: string }>()
);

export const CLEAR_COMPLETED_TODO = createAction(
  '[Todo] Clear Completed Todo',
  props<{ id: number }>()
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
export function LOCAL_STORAGE_UPDATE(arg0: { todos: Todo[] }) {
  throw new Error('Function not implemented.');
}
