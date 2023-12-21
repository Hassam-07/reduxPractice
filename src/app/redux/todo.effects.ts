import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  tap,
  withLatestFrom,
  map,
  switchMap,
  concatMap,
  mergeMap,
} from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as TodoActions from './todo.actions';
import { selectAll, TodosState } from './reducer';
import { selectAllTodos } from './state';
import { Todo } from '../models/Todo';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';

@Injectable()
export class TodoEffects {
  private apiUrl = 'http://localhost:3000/todos';
  constructor(
    private actions$: Actions,
    private store: Store<TodosState>,
    private http: HttpClient,
    private todoServices: TodoService
  ) {}

  // storedTodo$ = createEffect(
  //   () =>
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoServices
          .getAllTodos()
          .pipe(map((todos: Todo[]) => TodoActions.loadTodosSuccess({ todos })))
      )
    )
  );

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.ADD_TODO),
      concatMap((action) => {
        return this.todoServices
          .addTodo(action.todo)
          .pipe(map((todo) => TodoActions.todoAdded({ todo })));
      })
    );
  });

  deleteTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.DELETE_TODO),
      mergeMap((action) =>
        this.todoServices
          .deleteTodo(action.id)
          .pipe(map(() => TodoActions.todoDeleted({ id: action.id })))
      )
    )
  );
  updateTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.EDIT_TODO),
      mergeMap((action) =>
        this.todoServices
          .editTodo(action.id, action.todo)
          .pipe(
            map(() =>
              TodoActions.todoToBeEdit({ id: action.id, todo: action.todo })
            )
          )
      )
    )
  );

  markAsComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.UPDATE_TODO),
      mergeMap((action) =>
        this.todoServices
          .markAsComplete(action.id)
          .pipe(map(() => TodoActions.markAsCompleted({ id: action.id })))
      )
    )
  );
}
