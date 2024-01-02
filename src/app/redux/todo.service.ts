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
  private apiUrl = 'http://localhost:3000/todos1';

  constructor(private http: HttpClient, private store: Store) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  editTodo(id: number, todo: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  markAsComplete(todoId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${todoId}`, {
      complete: true,
    });
  }
  clearCompleted(): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}?completed=true`);
  }
}
