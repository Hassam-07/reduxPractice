import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { Todo } from '../models/Todo';
import { Observable, catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

// const BASE_URL = 'http://localhost:3000/todos';
// const HEADER = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient, private store: Store) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  editTodo(id: string, todo: Todo): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  undoDelete(id: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/${id}`, {});
  }
  addTodoWithIndex(todo: Todo): Observable<Todo> {
    // Adjust the implementation based on your backend
    return this.http.post<Todo>(`${this.apiUrl}`, todo);
  }

  markAsComplete(todoId: string, status: boolean): Observable<Todo> {
    console.log(todoId);
    return this.http.patch<Todo>(`${this.apiUrl}/${todoId}`, {
      complete: status,
    });
  }
  clearCompleted(): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}`);
  }
}
