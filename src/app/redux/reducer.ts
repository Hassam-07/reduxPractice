import { createReducer, on, createSelector } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from '../models/Todo';
import { v4 as uuidv4 } from 'uuid';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const QUIZ_FEATURE_KEY = 'todo';
export interface TodosState extends EntityState<Todo> {
  filter: 'all' | 'active' | 'completed';
  deletedTodo: Todo | null;
}
export const todosAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();
export const initialState: TodosState = todosAdapter.getInitialState({
  filter: 'all',
  deletedTodo: null,
});

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.todoAdded, (state, { todo }) => {
    return todosAdapter.addOne(todo, state);
  }),

  on(TodoActions.todoDeleted, (state, { id }) => {
    const deletedTodo = state.entities[id];
    return {
      ...todosAdapter.removeOne(id, state),
      deletedTodo: deletedTodo, // Store the deleted todo
    };
  }),

  on(TodoActions.restoreDeletedTodo, (state, { todo }) => {
    return {
      ...state,
      deletedTodo: todo,
    };
  }),

  on(TodoActions.markAsCompletedSuccess, (state, { id }) => {
    return todosAdapter.updateOne(
      { id: id, changes: { complete: !state.entities[id].complete } },
      state
    );
  }),

  on(TodoActions.todoToBeEdit, (state, { id, todo }) => {
    return todosAdapter.updateOne(
      { id: id, changes: { name: todo.name } },
      state
    );
  }),

  on(TodoActions.SET_FILTER, (state, { filter }) => {
    return { ...state, filter };
  }),

  on(TodoActions.setTodo, (state, { todo }) => {
    return todosAdapter.setAll(todo, state);
  }),

  on(TodoActions.loadTodosSuccess, (state, { todos }) => {
    return todosAdapter.setAll(todos, state);
  })
);
