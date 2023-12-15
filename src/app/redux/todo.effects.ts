// import { Injectable } from '@angular/core';
// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { tap, map, concatMap } from 'rxjs/operators';
// import { of } from 'rxjs';

// import * as TodoActions from './todo.actions';
// // import * as TodoApiActions from './todo-api.actions';

// @Injectable()
// export class TodoEffects {
//   persistTodos$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(
//         TodoActions.ADD_TODO,
//         TodoActions.DELETE_TODO,
//         TodoActions.UPDATE_TODO,
//         TodoActions.EDIT_TODO,
//         TodoActions.CLEAR_COMPLETED_TODO
//       ),
//       concatMap(() => {
//         // Retrieve todos from the store
//         const todosString = localStorage.getItem('todos');
//         const todos = todosString ? JSON.parse(todosString) : [];

//         // Dispatch the action to store todos in the local storage
//         return of(TodoActions.STORE_TODOS({ todos }));
//       })
//     )
//   );

//   constructor(private actions$: Actions) {}
// }

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap, withLatestFrom, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { selectAll, TodosState } from './reducer';
import { selectAllTodos } from './state';
import { Todo } from '../models/Todo';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private store: Store<TodosState>) {}

  storedTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TodoActions.ADD_TODO,
          TodoActions.UPDATE_TODO,
          TodoActions.DELETE_TODO,
          TodoActions.EDIT_TODO,
          TodoActions.CLEAR_COMPLETED_TODO
        ),
        withLatestFrom(this.store.pipe(select(selectAllTodos))),
        tap(([action, todos]) => {
          localStorage.setItem('todos', JSON.stringify(todos));
        })
      ),
    { dispatch: false }
  );
  retrieveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.enterTodosPage),
      map(() => {
        const todos = localStorage.getItem('todos');
        return JSON.parse(todos) as Todo[];
      }),
      map((todo) => TodoActions.setTodo({ todo }))
    )
  );
}
