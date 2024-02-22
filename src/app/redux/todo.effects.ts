import { Injectable } from '@angular/core';
import {
  Actions,
  ofType,
  createEffect,
  concatLatestFrom,
  act,
} from '@ngrx/effects';
import {
  tap,
  withLatestFrom,
  map,
  switchMap,
  concatMap,
  mergeMap,
  catchError,
  filter,
  take,
} from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as TodoActions from './todo.actions';
import { TodosState } from './reducer';
import { EMPTY, of } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectAllTodos, selectDeletedTodo } from './selectors';

@Injectable()
export class TodoEffects {
  private apiUrl = 'http://localhost:3000/todos';
  constructor(
    private actions$: Actions,
    private todoServices: TodoService,
    private readonly store: Store,
    private snackbar: MatSnackBar
  ) {}

  // storedTodo$ = createEffect(
  //   () =>
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoServices.getAllTodos().pipe(
          tap((todos: Todo[]) => {
            console.log('Todos:', todos);
          }),
          map((todos: Todo[]) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => {
            console.error('Error in loadTodos effect:', error);
            return of(
              TodoActions.FailLoadTodos({
                error,
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
          tap(() => {
            const snackBarRef = this.snackbar.open('Todo Deleted', 'Undo', {
              duration: 10000,
            });
            snackBarRef.onAction().subscribe(() => {
              // Dispatch action to undo delete operation
              this.store.dispatch(TodoActions.undoDeletedTodo());
            });
          }),
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

  undoDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.undoDeletedTodo),
      concatLatestFrom(() => this.store.pipe(select(selectDeletedTodo))),
      filter(([action, deletedTodo]) => !!deletedTodo),
      mergeMap(([action, deletedTodo]) =>
        this.todoServices.addTodo(deletedTodo).pipe(
          map((restoredTodo: Todo) =>
            TodoActions.todoAdded({ todo: restoredTodo })
          ),
          catchError((error) =>
            of(
              TodoActions.UndoTodoFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // undoDelete$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TodoActions.undoDeletedTodo),
  //     mergeMap(() =>
  //       this.store.pipe(select(selectDeletedTodo)).pipe(
  //         map((deletedTodo) => {
  //           if (deletedTodo) {
  //             return TodoActions.addRestoredTodo({ todo: deletedTodo });
  //           } else {
  //             return TodoActions.undoDeleteFailure({
  //               error: 'No deleted todo to undo',
  //             });
  //           }
  //         }),
  //         catchError((error) => of(TodoActions.undoDeleteFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // addRestoredTodo$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TodoActions.addRestoredTodo),
  //     mergeMap(({ todo }) =>
  //       this.todoServices.addTodoWithIndex(todo).pipe(
  //         map((restoredTodo: Todo) =>
  //           TodoActions.restoredTodoAddedSuccess({ todo: restoredTodo })
  //         ),
  //         catchError((error) =>
  //           of(TodoActions.restoredTodoAddedFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  editTodo$: Observable<Action> = createEffect(() =>
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
      ofType(TodoActions.markAsCompleted),
      mergeMap((action) =>
        this.todoServices.markAsComplete(action.id, !action.todo.complete).pipe(
          map(() =>
            TodoActions.markAsCompletedSuccess({
              id: action.id,
              todo: action.todo,
            })
          ),
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
      concatLatestFrom(() => this.store.pipe(select(selectAllTodos))),
      mergeMap(([, todos]) =>
        todos
          .filter((todo) => todo.complete)
          .map((todo) => TodoActions.DELETE_TODO({ id: todo.id }))
      )
    )
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TodoActions.FailLoadTodos,
          TodoActions.todoAddedFailure,
          TodoActions.todoDeletedFailure,
          TodoActions.todoEditFailure,
          TodoActions.markAsCompletedFailure,
          TodoActions.undoDeleteFailure,
          TodoActions.UndoTodoFailure
        ),
        tap(() =>
          this.snackbar.open(
            'Something went wrong. Please try again later.',
            'Error'
          )
        )
      ),
    { dispatch: false }
  );
}
