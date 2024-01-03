import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { StoreModule } from '@ngrx/store';
import { TodoActions } from '.';
import { TodoEffects } from './todo.effects';
import { TodoService } from './todo.service';

describe('TodoEffects', () => {
  let effects: TodoEffects;
  let actions$: Observable<any>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        {
          provide: TodoService,
          useValue: jasmine.createSpyObj('ReduxTodoService', [
            'getAllTodos',
            'addTodo',
            'deleteTodo',
            'updateTodo',
            'markAsComplete',
          ]),
        },
      ],
    });

    effects = TestBed.inject(TodoEffects);
    actions$ = TestBed.inject(Actions);
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should dispatch loadTodoSuccess action on successful loadTodos', () => {
    const todos = [
      { id: '1', name: 'Todo 1', complete: false, editing: false },
    ];
    const action = TodoActions.loadTodosSuccess({ todos });

    todoService.getAllTodos.and.returnValue(of(todos));

    actions$ = of(action);

    effects.loadTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(
        TodoActions.loadTodosSuccess({ todos: todos })
      );
    });
  });

  it('should dispatch showNetworkError action on error in loadTodos', () => {
    const error = 'Failed to load todos. Please try again.';
    const action = TodoActions.loadTodosFail({
      errorMessage: 'Failed to load todos. Please try again.',
    });

    todoService.getAllTodos.and.returnValue(throwError(error));

    actions$ = of(action);

    effects.loadTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(jasmine.any(TodoActions.loadTodosFail));
    });
  });

  it('should dispatch todoAdded action on successful addTodo', () => {
    const todo = { id: '1', name: 'New Todo', complete: false, editing: false };
    const action = TodoActions.ADD_TODO({ todo });

    todoService.addTodo.and.returnValue(of(todo));

    actions$ = of(action);

    effects.addTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(TodoActions.todoAdded({ todo }));
    });
  });

  it('should dispatch todoDeleted action on successful deleteTodo', () => {
    const action = TodoActions.DELETE_TODO({ id: 1 });

    todoService.deleteTodo.and.returnValue(of(null));

    actions$ = of(action);

    effects.deleteTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(TodoActions.todoDeleted({ id: 1 }));
    });
  });

  it('should dispatch todoToBeUpdated action on successful updateTodo', () => {
    const todo = {
      id: 1,
      name: 'Updated Todo',
      complete: false,
      editing: false,
    };
    const action = TodoActions.EDIT_TODO({
      id: 1,
      todo: todo.name,
    });

    todoService.editTodo.and.returnValue(of(action.todo));

    actions$ = of(action);

    effects.updateTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(
        TodoActions.todoToBeEdit({ id: 1, todo: todo.name })
      );
    });
  });

  it('should dispatch markAsCompleted action on successful markAsComplete', () => {
    const todo = { id: 1, name: 'Todo 1', complete: false };
    const action = TodoActions.UPDATE_TODO({ id: 1 });

    todoService.markAsComplete.and.returnValue(of());

    actions$ = of(action);

    effects.markAsComplete$.subscribe((resultAction) => {
      expect(resultAction).toEqual(TodoActions.markAsCompleted({ id: 1 }));
    });
  });

  it('should dispatch clearCompletedSuccess action on successful clearCompleted', () => {
    const action = TodoActions.CLEAR_COMPLETED_TODO({ id: 1 });

    todoService.getAllTodos.and.returnValue(of([]));

    actions$ = of(action);

    effects.clearCompleted$.subscribe((resultAction) => {
      expect(resultAction).toEqual(
        TodoActions.CLEAR_COMPLETED_TODO_SUCCESS({ id: 1 })
      );
    });
  });
});
