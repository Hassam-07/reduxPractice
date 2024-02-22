import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';
import { TodosState } from './reducer';
import { MatSnackBarRef } from '@angular/material/snack-bar';

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
  props<{ id: string }>()
);
export const todoDeleted = createAction(
  '[Todo/API] todo deleted Success',
  props<{ id: string }>()
);
export const todoDeletedFailure = createAction(
  '[Todo/API] todo deleted Failure',
  props<{ error: any }>()
);
export const UNDO_DELETE = createAction(
  '[Todo]Undo Delete Todo',
  props<{ todo: Todo }>()
);
export const UndoDeletedSuccess = createAction(
  '[Todo/API]Undo deleted todo Success',
  props<{ todo: Todo }>()
);
export const undoDeleteFailure = createAction(
  '[Todo/API] todo deleted Failure',
  props<{ error: any }>()
);

export const markAsCompleted = createAction(
  '[Todo] mark as completed Todo',
  props<{ id: string; todo: Todo }>()
);
export const markAsCompletedSuccess = createAction(
  '[Todo] mark as completed',
  props<{ id: string; todo: Todo }>()
);

export const markAsCompletedFailure = createAction(
  '[Todo/API] mark as completed Failure',
  props<{ error: any }>()
);

export const EDIT_TODO = createAction(
  '[Todo] Edit Todo',
  props<{ id: string; todo: Todo }>()
);
export const todoToBeEdit = createAction(
  '[Todo/API] todo to be Edited',
  props<{ id: string; todo: Todo }>()
);
export const todoEditFailure = createAction(
  '[Todo/API] todo Edited Failure',
  props<{ error: any }>()
);

export const CLEAR_COMPLETED_TODO = createAction('[Todo] Clear Completed Todo');
export const CLEAR_COMPLETED_TODO_SUCCESS = createAction(
  '[Todo/API] Clear Completed Todo Successful'
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

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodos = createAction('[Todo] load todo ');
export const FailLoadTodos = createAction(
  '[Todo]Fail load todo ',
  props<{ error: any }>()
);
export const UndoTodoFailure = createAction(
  '[Todo]Fail Undo todo ',
  props<{ error: any }>()
);

export const removeErrorModal = createAction('[Error] Clear Error');

export const undoDeletedTodo = createAction('[Todo Page] Undo Deleted Todo');
export const restoreDeletedTodo = createAction(
  '[Todo] Restore Deleted Todo',
  props<{ todo: Todo }>()
);

export const addRestoredTodo = createAction(
  '[Todo] Add Restored Todo',
  props<{ todo: Todo }>()
);

export const restoredTodoAddedSuccess = createAction(
  '[Todo] Restored Todo Added Success',
  props<{ todo: Todo }>()
);

export const restoredTodoAddedFailure = createAction(
  '[Todo] Restored Todo Added Failure',
  props<{ error: any }>()
);
