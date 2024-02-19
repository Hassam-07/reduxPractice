import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { createSelector, Store } from '@ngrx/store';
import { TodosState } from './reducer';
import {
  selectAllTodos,
  incompleteTodosLength,
  currentTodoTab,
  selectFilteredTodos,
} from './selectors';
import { Todo } from '../models/Todo';

describe('Todo Selectors', () => {
  let store: MockStore<TodosState>;

  const initialState: TodosState = {
    ids: ['1', '2'],
    entities: {
      '1': { id: '1', name: 'Todo 1', complete: false },
      '2': { id: '2', name: 'Todo 2', complete: true },
    },
    filter: 'all',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
  });

  it('should select all todos', () => {
    let selectedTodos: Todo[] = [];
    store.select(selectAllTodos).subscribe((todos) => {
      selectedTodos = todos;
    });
    expect(selectedTodos.length).toBe(2);
    expect(selectedTodos[0].name).toBe('Todo 1');
    expect(selectedTodos[1].name).toBe('Todo 2');
  });

  it('should select incomplete todos length', () => {
    let length = 0;
    store.select(incompleteTodosLength).subscribe((len) => {
      length = len;
    });
    expect(length).toBe(1);
  });

  it('should select current todo tab', () => {
    let tab = '';
    store.select(currentTodoTab).subscribe((selectedTab) => {
      tab = selectedTab;
    });
    expect(tab).toBe('all');
  });

  it('should select filtered todos', () => {
    let filteredTodos: Todo[] = [];
    store.select(selectFilteredTodos).subscribe((todos) => {
      filteredTodos = todos;
    });
    expect(filteredTodos.length).toBe(2); // All todos by default
  });

  // Add more test cases for other selectors...
});
