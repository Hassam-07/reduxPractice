import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  tap,
  withLatestFrom,
  map,
  switchMap,
  concatMap,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as TodoActions from './todo.actions';
import { selectAll, TodosState } from './reducer';
import { selectAllTodos } from './state';
import { EMPTY, of } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TodoEffects {
  private apiUrl = 'http://localhost:3000/todos';
  constructor(private actions$: Actions, private todoServices: TodoService) {}

  // storedTodo$ = createEffect(
  //   () =>
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoServices.getAllTodos().pipe(
          map((todos: Todo[]) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => {
            console.error('Error in loadTodos effect:', error);
            return of(
              TodoActions.loadTodosFail({
                errorMessage: 'Failed to load todos. Please try again.',
              })
            );
          })
        )
      )
    )
  );

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.ADD_TODO),
      concatMap(({ todo }) => {
        return this.todoServices.addTodo(todo).pipe(
          map((todo) =>
            TodoActions.todoAdded({
              todo,
            })
          ),
          catchError((error) =>
            of(
              TodoActions.todoAddedFailure({
                error,
              })
            )
          )
        );
      })
    );
  });

  deleteTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.DELETE_TODO),
      mergeMap((action) =>
        this.todoServices.deleteTodo(action.id).pipe(
          map(() => TodoActions.todoDeleted({ id: action.id })),
          catchError((error) =>
            of(
              TodoActions.todoDeletedFailure({
                error,
              })
            )
          )
        )
      )
    )
  );
  updateTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.EDIT_TODO),
      mergeMap((action) =>
        this.todoServices.editTodo(action.id, action.todo).pipe(
          map(() =>
            TodoActions.todoToBeEdit({ id: action.id, todo: action.todo })
          ),
          catchError((error) =>
            of(
              TodoActions.todoEditFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  markAsComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.UPDATE_TODO),
      mergeMap((action) =>
        this.todoServices.markAsComplete(action.id).pipe(
          map(() => TodoActions.markAsCompleted({ id: action.id })),
          catchError((error) =>
            of(
              TodoActions.markAsCompletedFailure({
                error,
              })
            )
          )
        )
      )
    )
  );
  clearCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.CLEAR_COMPLETED_TODO),
      mergeMap((action) =>
        this.todoServices.clearCompleted().pipe(
          map(() => TodoActions.CLEAR_COMPLETED_TODO_SUCCESS({ id: action.id })),
          catchError((error) =>
            of(
              TodoActions.CLEAR_COMPLETED_TODO_FAILURE({
                error,
              })
            )
          )
        )
      )
    )
  );
  // clearCompleted$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TodoActions.CLEAR_COMPLETED_TODO),
  //     mergeMap(() =>
  //       this.todoServices.getAllTodos().pipe(
  //         map((todos) => {
  //           const completedTodos = todos.filter((todo) => todo.complete);
  //           completedTodos.forEach((completedTodo) => {
  //             if (completedTodo.id) {
  //               this.todoServices
  //                 .deleteTodo(completedTodo.id)
  //                 .subscribe(() => {
  //                   console.log('delete', completedTodo.id);
  //                 });
  //             }
  //           });
  //           return TodoActions.CLEAR_COMPLETED_TODO_SUCCESS({ id: });
  //         }),
  //         catchError((error) => {
  //           console.error('Error deleting todo:', error);
  //           of(
  //             TodoActions.showNetworkError({
  //               errorMessage: 'Network error. Not all completed todos Deleted',
  //             })
  //           );
  //           return EMPTY;
  //         })
  //       )
  //     )
  //   )
  // );
}
