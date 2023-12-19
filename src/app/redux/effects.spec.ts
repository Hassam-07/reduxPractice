import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Actions, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { TodoEffects } from './todo.effects';
import * as TodoActions from './todo.actions';
import { TodosState, initialState } from './reducer';
import { selectAllTodos } from './state';
import { Todo } from '../models/Todo';

describe('TodoEffects', () => {
  let effects: TodoEffects;
  let actions: Actions;
  let store: MockStore<TodosState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockStore({ initialState }),
        {
          provide: Actions,
          useValue: EMPTY,
        },
      ],
    });

    effects = TestBed.inject(TodoEffects);
    actions = TestBed.inject(Actions);
    store = TestBed.inject(MockStore);
  });

  it('should store todos in local storage on AddTodo action', () => {
    const todo: Todo = {
      id: 1,
      name: 'Todo 1',
      complete: false,
      editing: false,
    };
    const action = TodoActions.ADD_TODO({ todo });
    spyOnProperty(localStorage, 'setItem');
    // Spy on store.dispatch
    spyOn(store, 'dispatch');

    // Dispatch action
    store.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should store todos in local storage on ADDTODO action', fakeAsync(() => {
    // Arrange
    const todo = { id: 1, name: 'Todo 1', complete: false, editing: false };
    const action = TodoActions.ADD_TODO({ todo });

    // Mock the selectAllTodos selector
    spyOn(store, 'pipe').and.returnValue(of([todo]));

    // Mock localStorage.setItem
    spyOn(localStorage, 'setItem');

    // Act
    effects.storedTodo$.subscribe();

    tick();

    // Assert
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'todos',
      JSON.stringify([todo])
    );
  }));
  it('should retrieve todos from local storage on entering the todos page', fakeAsync(() => {
    // Arrange
    const todos = [{ id: 1, name: 'Todo 1', complete: false, editing: false }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(todos));
    const action = TodoActions.enterTodosPage();
    spyOn(actions, 'pipe').and.returnValue(of(action));

    // Act
    effects.retrieveTodo$.subscribe((resultAction) => {
      // Assert
      expect(resultAction).toEqual(TodoActions.setTodo({ todo: todos }));
    });
  }));
});
