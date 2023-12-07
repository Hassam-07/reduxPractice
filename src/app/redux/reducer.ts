import { Todo } from '../models/Todo';
import { Action } from './actions';
import { v4 as uuidv4 } from 'uuid';

export interface TodosState {
  todos: Todo[];
}

export const initialState: TodosState = {
  todos: [
    { id: uuidv4(), name: 'Hassam', complete: true, editing: false },
    { id: uuidv4(), name: 'Qayyum', complete: false, editing: false },
    { id: uuidv4(), name: 'Hope', complete: false, editing: false },
  ],
};
// Redux Reducer Function
export const reducer = (
  state: TodosState = initialState,
  action: Action
): TodosState => {
  if (action.type === 'ADD_TODO') {
    const newTodo: Todo = {
      id: uuidv4(),
      name: action.payload?.['todo'],
      complete: false,
      editing: false,
    };
    return {
      ...state,
      todos: [...state.todos, newTodo],
    };
  }
  if (action.type == 'DELETE_TODO') {
    const deleteTodo = action.payload?.['id'];
    console.log(state.todos.filter((todo) => todo.id === deleteTodo));
    if (deleteTodo) {
      const deleteTodos = state.todos.filter((todo) => todo.id !== deleteTodo);
      return {
        ...state,
        todos: deleteTodos,
      };
    }
  }
  if (action.type === 'UPDATE_TODO') {
    const toggleTodoId = action.payload?.['id'];
    if (toggleTodoId) {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === toggleTodoId ? { ...todo, complete: !todo.complete } : todo
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    }
  }
  if (action.type === 'EDIT_TODO') {
    const editId = action.payload?.['id'];
    const editText = action.payload?.['todo'];
    if (editId && editText) {
      const editedTodos = state.todos.map((todo) =>
        todo.id === editId ? { ...todo, todo: editText } : todo
      );
      return {
        ...state,
        todos: editedTodos,
      };
    }
  }
  if (action.type === 'CLEAR_COMPLETED_TODO') {
    const clearTodos = state.todos.filter((todo) => !todo.complete);

    return {
      ...state,
      todos: [...clearTodos],
    };
  }
  return state;
};

// export let reducer = (state = todos, action: any) => {
//   let newTodos;
//   switch (action.type) {
//     case ADD_TODO:
//       newTodos = [...state];
//       newTodos.push(action.payload);
//       return newTodos;
//     case DELETE_TODO:
//       newTodos = [...state];
//       newTodos = newTodos.filter((todo) => todo.id != action.payload);
//       return newTodos;
//     case UPDATE_TODO:
//       newTodos = [...state];
//       let index = -1;
//       for (let i = 0; i < newTodos.length; i++) {
//         index++;
//         if (newTodos[i].id == action.payload.id) {
//           break;
//         }
//       }
//       if (index != -1) {
//         newTodos[index] = action.payload;
//         return newTodos;
//       }
//   }
//   return state;
// };
