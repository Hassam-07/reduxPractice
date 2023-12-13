import { NgModule } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import * as fromBooks from './reducer';

export const FEATURE_KEY = 'todos';

export interface State {
  todos: fromBooks.TodosState;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromBooks.todoReducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Module
 **/
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers })],
})
export class SharedStateTodosModule {}

export const selectSharedTodosState =
  createFeatureSelector<fromBooks.TodosState>('todos');

export const selectAllTodos = createSelector(
  selectSharedTodosState,
  (state) => state && state.todos
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
