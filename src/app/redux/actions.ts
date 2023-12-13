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

export const ADD_TODO = createAction(
  '[Todo] Add Todo',
  props<{ todo: string }>()
);

export const DELETE_TODO = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);

export const UPDATE_TODO = createAction(
  '[Todo] Update Todo',
  props<{ id: string }>()
);

export const EDIT_TODO = createAction(
  '[Todo] Edit Todo',
  props<{ id: string; todo: string }>()
);

export const CLEAR_COMPLETED_TODO = createAction(
  '[Todo] Clear Completed Todo',
  props<{ id: string }>()
);

export const SET_FILTER = createAction(
  '[Todo] Set Filter',
  props<{ filter: 'all' | 'active' | 'completed' }>()
);
