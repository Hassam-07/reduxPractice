import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QUIZ_FEATURE_KEY, TodosState, todosAdapter } from './reducer';

export const selectSharedTodosState =
  createFeatureSelector<TodosState>('todos');

const { selectAll } = todosAdapter.getSelectors();

export const selectAllTodos = createSelector(
  selectSharedTodosState,
  (state: TodosState) => selectAll(state)
);

export const incompleteTodosLength = createSelector(
  selectAllTodos,
  (todos) => todos.filter((todo) => !todo.complete).length
);
export const currentTodoTab = createSelector(
  selectSharedTodosState,
  (state) => state.filter
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectSharedTodosState,
  (todos, state) => {
    const filter = state.filter;
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.complete);
      case 'completed':
        return todos.filter((todo) => todo.complete);
      default:
        return todos;
    }
  }
);
