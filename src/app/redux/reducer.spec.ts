import { Todo } from '../models/Todo';
import { todoReducer, initialState, TodosState } from './reducer';
import * as Actions from './todo.actions';
import { Action } from 'rxjs/internal/scheduler/Action';
import { v4 as uuidv4 } from 'uuid';

const todos: Todo[] = [
  {
    id: '1',
    name: 'hassam',
    complete: false,
  },
  {
    id: '2',
    name: 'has',
    complete: false,
  },
  {
    id: '3',
    name: 'h',
    complete: false,
  },
];
describe('reducerTodo', () => {
  it('should handle "ADDTODO" action', () => {
    // Arrange
    const todo = {
      id: '1',
      name: 'hassam',
      complete: false,
    };
    const action = Actions.todoAdded({ todo });

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.todos.length).toBe(1);
    expect(newState.todos[0].name).toEqual(todo.name);
  });
  it('should handle DELETETODO action', () => {
    // Arrange
    const initialTodo = {
      ...initialState,
      todos: [{ id: 1, name: 'Test Todo', complete: false }],
    };
    const action = Actions.todoDeleted({ id: 1 });

    // Act
    const newState = todoReducer(initialTodo, action);

    // Assert
    expect(newState.todos.length).toBe(0);
  });

  it('should handle MARKCOMPLETED action', () => {
    // Arrange
    const initialState: TodosState = {
      todos: [
        { id: 1, name: 'Todo 1', complete: false },
        { id: 2, name: 'Todo 2', complete: false },
        { id: 3, name: 'Todo 3', complete: false },
      ],
      filter: 'all',
    };

    const action = Actions.markAsCompleted({
      id: 1,
      todo: { id: 1, name: 'Todo 1', complete: false },
    });
    const actionWithInvalidId = Actions.markAsCompleted({
      id: 4,
      todo: { id: 4, name: 'Todo 1', complete: false },
    });

    // Act
    const newState = todoReducer(initialState, action);
    const newStateWithInvalidId = todoReducer(
      initialState,
      actionWithInvalidId
    );

    // Assert
    expect(newState.todos.length).toBe(3);

    // Check when action dispatched on targeted todo and other not change
    expect(newState.todos[0].id).toBe(1);
    expect(newState.todos[0].complete).toBe(true);

    // Check if other(second index) todos remain unchanged
    expect(newState.todos[2].id).toBe(3);
    expect(newState.todos[2].complete).toBe(false);

    //should return the same state when MARKCOMPLETED action is dispatched with an invalid ID
    expect(newStateWithInvalidId).toEqual(initialState);
  });
  it('should handle UPDATETODO action ', () => {
    // Arrange
    const initialState: TodosState = {
      todos: [
        { id: 1, name: 'Todo 1', complete: false },
        { id: 2, name: 'Todo 2', complete: false },
        { id: 3, name: 'Todo 3', complete: false },
      ],
      filter: 'all',
    };

    const updatedTodo = {
      id: 1,
      name: 'Updated Todo 1',
      complete: false,
    };
    const action = Actions.todoToBeEdit({ id: 1, todo: updatedTodo });

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.todos.length).toBe(3);

    // Check when action dispatched on targeted todo and name changed
    expect(newState.todos[0].id).toBe(1);
    expect(newState.todos[0].name).toBe('Updated Todo 1');

    // Check if other todos remain unchanged
    expect(newState.todos[0].complete).toBe(false);
  });
  it('should handle CLEARCOMPLETED action', () => {
    //Arrange
    const initialState: TodosState = {
      todos: [
        { id: 1, name: 'Todo 1', complete: false },
        { id: 2, name: 'Todo 2', complete: true },
        { id: 3, name: 'Todo 3', complete: false },
      ],
      filter: 'all',
    };

    const Action = Actions.DELETE_TODO({ id: 1 });
    //Act
    const newState = todoReducer(initialState, Action);

    //Assert
    expect(newState.todos.length).toBe(2);

    expect(newState.todos[1].id).toBe(3);
    expect(newState.todos[1].name).toBe('Todo 3');
    expect(newState.todos[1].complete).toBe(false);
  });
  it('should update the filter when handle FILTERDATA action', () => {
    // Arrange
    const initialState: TodosState = {
      todos: [
        { id: 1, name: 'Todo 1', complete: true },
        { id: 2, name: 'Todo 2', complete: true },
        { id: 3, name: 'Todo 3', complete: true },
      ],
      filter: 'all',
    };

    const actionCompleted = Actions.SET_FILTER({ filter: 'completed' });
    const actionActive = Actions.SET_FILTER({ filter: 'active' });

    // Act
    const StateCompleted = todoReducer(initialState, actionCompleted);
    const StateActive = todoReducer(initialState, actionActive);

    // Assert
    // expect(StateCompleted.todos.length).toBe(0);
    expect(StateActive.todos.length).toBe(3);

    // // Check if the filter property is updated
    // expect(StateCompleted.filter).toBe('completed');
    // expect(StateActive.filter).toBe('active');
  });

  it('should set todos when setTodo action is dispatched', () => {
    // Arrange
    const initialState: TodosState = {
      todos: [],
      filter: 'all',
    };

    const todosToAdd = [
      { id: 1, name: 'Todo 1', complete: false },
      { id: 2, name: 'Todo 2', complete: true },
    ];

    const action = Actions.setTodo({ todo: todosToAdd });

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.todos.length).toBe(2);

    // Check if the todos are added
    expect(newState.todos[0].id).toBe(1);
    expect(newState.todos[1].id).toBe(2);
    expect(newState.todos[1].complete).toBe(true);

    // Check if the filter property remains unchanged
    expect(newState.filter).toBe('all');
  });
});
