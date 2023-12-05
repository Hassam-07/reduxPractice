import { Todo } from '../models/Todo';
import { Action } from './actions';
import { TodosActionTypes, TodosActionsUnion } from './actions';

// export interface State {
//   count: number;
// }

// export const initialState: State = {
//   count: 0,
// };

// // Redux Reducer Function
// export const reducer = (state: State = initialState, action: Action): State => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { ...state, count: state.count + 1 };
//     case 'DECREMENT':
//       return { ...state, count: state.count - 1 };
//     case 'RESET':
//       return { ...state, count: 0 };
//     default:
//       return state;
//   }
// };
export interface TodosState {
  todos: Todo[];
}

export const initialState: TodosState = {
  todos: [],
};

export function todosReducer(
  state = initialState,
  action: TodosActionsUnion
): TodosState {
  switch (action.type) {
    case TodosActionTypes.AddTodo:
      return { ...state, todos: [...state.todos, action.payload.todo] };

    case TodosActionTypes.DeleteTodo:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case TodosActionTypes.UpdateTodo:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.todo }
            : todo
        ),
      };

    case TodosActionTypes.TogglePin:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, pinned: !todo.pinned }
            : todo
        ),
      };

    case TodosActionTypes.MarkAsComplete:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, complete: action.payload.complete }
            : todo
        ),
      };

    case TodosActionTypes.ClearCompleted:
      return { ...state, todos: state.todos.filter((todo) => !todo.complete) };

    default:
      return state;
  }
}
