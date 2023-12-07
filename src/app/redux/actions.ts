import { Todo } from '../models/Todo';

export interface Action {
  type: string;
  payload?: { [key: string]: any };
}

export interface Action {
  type: string;
  payload?: { [key: string]: any };
}

export const ADD_TODO = (todo: string): Action => ({
  type: 'ADD_TODO',
  payload: { todo },
});

export const DELETE_TODO = (id: string): Action => ({
  type: 'DELETE_TODO',
  payload: { id },
});

export const UPDATE_TODO = (id: string): Action => ({
  type: 'UPDATE_TODO',
  payload: { id },
});
export const EDIT_TODO = (id: string, todo: string): Action => ({
  type: 'EDIT_TODO',
  payload: { id, todo },
});
export const CLEAR_COMPLETED_TODO = (Todo: string): Action => ({
  type: 'CLEAR_COMPLETED_TODO',
  payload: { Todo },
});

// export const ADD_TODO = 'ADD_TODO';
// export const DELETE_TODO = 'DELETE_TODO';
// export const UPDATE_TODO = 'UPDATE_TODO';

// export function addTodos(todo: Todo) {
//   return {
//     type: ADD_TODO,
//     payload: todo,
//   };
// }

// export function deleteTodos(todoId: number) {
//   return {
//     type: DELETE_TODO,
//     payload: todoId,
//   };
// }

// export function updateTodos(todo: Todo) {
//   return {
//     type: UPDATE_TODO,
//     payload: todo,
//   };
// }
