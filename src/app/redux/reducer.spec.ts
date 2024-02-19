import { EntityState } from '@ngrx/entity';
import { Todo } from '../models/Todo';
import { todoReducer, initialState, TodosState, todosAdapter } from './reducer';
import * as TodoActions from './todo.actions';
import { v4 as uuidv4 } from 'uuid';

const todos: Todo[] = [
  {
    id: '1',
    name: 'Todo 1',
    complete: false,
  },
  {
    id: 2,
    name: 'Todo 2',
    complete: true,
  },
];

describe('todoReducer', () => {
  it('should handle "todoAdded" action', () => {
    // Arrange
    const todoToAdd: Todo = {
      id: '3',
      name: 'Todo 3',
      complete: false,
    };
    const action = TodoActions.todoAdded({ todo: todoToAdd });

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    const entities = todosAdapter.getSelectors().selectAll(newState);
    expect(entities.length).toBe(1);
    expect(entities[0].name).toEqual(todoToAdd.name);
  });

  it('should delete the todo', () => {
    // Arrange
    const todos: Todo[] = [
      { id: '1', name: 'Todo 1', complete: false },
      { id: '2', name: 'Todo 2', complete: true },
    ];
    const initialTodosState: TodosState = {
      ...initialState,
      entities: todosAdapter.setAll(todos, initialState).entities,
    };
    const action = TodoActions.todoDeleted({ id: '1' });

    // Act
    const newState = todoReducer(initialTodosState, action);

    // Assert
    const updatedState: EntityState<Todo> = todosAdapter.removeOne(
      '1',
      initialTodosState
    );
    expect(newState).toEqual(updatedState as TodosState);
    expect(newState.entities['1']).toBeUndefined(); // Ensure the todo is removed from entities
  });

  describe('markAsCompletedSuccess reducer', () => {
    it('should toggle the complete status of a todo', () => {
      // Arrange
      const todo: Todo = { id: '1', name: 'Test Todo', complete: false };
      const initialTodos: Todo[] = [todo];
      const initialStateWithData: TodosState = {
        ...initialState,
        entities: todosAdapter.setAll(initialTodos, initialState).entities,
      };
      const action = TodoActions.markAsCompletedSuccess({ id: '1', todo });

      // Act
      const newState = todoReducer(initialStateWithData, action);

      // Assert
      const updatedTodo = newState.entities['1'];
      expect(updatedTodo).toBeDefined();
      expect(updatedTodo.complete).toBe(true);
    });

    it('should not modify other todos', () => {
      // Arrange
      const todos: Todo[] = [
        { id: '1', name: 'Todo 1', complete: false },
        { id: '2', name: 'Todo 2', complete: false },
        { id: '3', name: 'Todo 3', complete: false },
      ];
      const initialStateWithData: TodosState = {
        ...initialState,
        entities: todosAdapter.setAll(todos, initialState).entities,
      };
      const action = TodoActions.markAsCompletedSuccess({
        id: '1',
        todo: todos[0],
      });

      // Act
      const newState = todoReducer(initialStateWithData, action);

      // Assert
      expect(newState.entities['2'].complete).toBe(false);
      expect(newState.entities['3'].complete).toBe(false);
    });
  });

  it('should update the name of a todo', () => {
    // Arrange
    const todo: Todo = { id: '1', name: 'Test Todo', complete: false };
    const initialTodos: Todo[] = [todo];
    const initialStateWithData: TodosState = {
      ...initialState,
      entities: todosAdapter.setAll(initialTodos, initialState).entities,
    };
    const newName = 'Updated Todo';
    const action = TodoActions.todoToBeEdit({
      id: '1',
      todo: { ...todo, name: newName },
    });

    // Act
    const newState = todoReducer(initialStateWithData, action);

    // Assert
    const updatedTodo = newState.entities['1'];
    expect(updatedTodo).toBeDefined();
    expect(updatedTodo.name).toEqual(newName);
  });

  it('should handle "SET_FILTER" action', () => {
    // Arrange
    const action = TodoActions.SET_FILTER({ filter: 'completed' });

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.filter).toBe('completed');
  });

  it('should handle "setTodo" action', () => {
    // Arrange
    const todosToAdd: Todo[] = [
      { id: '3', name: 'Todo 3', complete: false },
      { id: '4', name: 'Todo 4', complete: true },
    ];
    const action = TodoActions.setTodo({ todo: todosToAdd });

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    const entities = todosAdapter.getSelectors().selectAll(newState);
    expect(entities.length).toBe(2);
    expect(entities.find((todo) => todo.id === '3')).toBeDefined();
    expect(entities.find((todo) => todo.id === '4')).toBeDefined();
    expect(entities.find((todo) => todo.id === '4')?.complete).toBe(true);
  });

  it('should handle "Load Todo Success" action', () => {
    // Arrange
    const todos: Todo[] = [
      {
        id: '1',
        name: 'Todo 1',
        complete: false,
      },
      {
        id: '2',
        name: 'Todo 2',
        complete: true,
      },
    ];
    const action = TodoActions.loadTodosSuccess({ todos: todos });

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    const entities = todosAdapter.getSelectors().selectAll(newState);
    expect(entities.length).toBe(2);
    expect(entities.find((todo) => todo.id === '1')).toEqual(todos[0]);
    expect(entities.find((todo) => todo.id === '2')).toEqual(todos[1]);
  });
});
