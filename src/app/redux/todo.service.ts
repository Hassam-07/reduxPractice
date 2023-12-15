// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import * as uuid from 'uuid';
// import { Todo } from '../models/Todo';

// const BASE_URL = 'http://localhost:3000/todos';
// const HEADER = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

// @Injectable({
//   providedIn: 'root',
// })
// export class TodoService {
//   constructor(private http: HttpClient) {}

//   all() {
//     return this.http.get<Todo[]>(BASE_URL);
//   }

//   load(id: string) {
//     return this.http.get<Todo>(`${BASE_URL}/${id}`);
//   }

//   create(bookProps: any) {
//     const Todo: Todo = {
//       id: uuid.v4(),
//       ...bookProps,
//     };

//     return this.http.post<Todo>(`${BASE_URL}`, JSON.stringify(Todo), HEADER);
//   }

//   update(id: string, updates: Todo) {
//     return this.http.patch<Todo>(
//       `${BASE_URL}/${id}`,
//       JSON.stringify(updates),
//       HEADER
//     );
//   }

//   delete(id: string) {
//     return this.http.delete(`${BASE_URL}/${id}`);
//   }
// }

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import * as uuid from 'uuid';
// import { Todo } from '../models/Todo';

// const BASE_URL = 'http://localhost:3000/todos';
// const HEADER = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

// @Injectable({
//   providedIn: 'root',
// })
// export class TodoService {
//   constructor(private http: HttpClient) {}

//   private updateLocalStorage(todos: Todo[]): void {
//     localStorage.setItem('todos', JSON.stringify(todos));
//   }

//   all() {
//     return this.http.get<Todo[]>(BASE_URL);
//   }

//   load(id: string) {
//     return this.http.get<Todo>(`${BASE_URL}/${id}`);
//   }

//   create(bookProps: any) {
//     const newTodo: Todo = {
//       id: uuid.v4(),
//       ...bookProps,
//     };

//     // Retrieve current todos from localStorage
//     const todos = JSON.parse(localStorage.getItem('todos') || '[]');

//     // Add the new todo
//     todos.push(newTodo);

//     // Update localStorage
//     this.updateLocalStorage(todos);

//     return this.http.post<Todo>(BASE_URL, JSON.stringify(newTodo), HEADER);
//   }

//   update(id: string, updates: Todo) {
//     return this.http.patch<Todo>(
//       `${BASE_URL}/${id}`,
//       JSON.stringify(updates),
//       HEADER
//     );
//   }

//   delete(id: string) {
//     const todos = JSON.parse(localStorage.getItem('todos') || '[]');

//     // Remove the todo with the given id
//     const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);

//     // Update localStorage
//     this.updateLocalStorage(updatedTodos);

//     return this.http.delete(`${BASE_URL}/${id}`);
//   }
// }
