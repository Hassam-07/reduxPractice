import { Component, OnInit } from '@angular/core';

import { Observable, catchError, startWith } from 'rxjs';
import { Todo } from './models/Todo';
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_FILTER,
  CLEAR_COMPLETED_TODO,
  enterTodosPage,
} from './redux/todo.actions';
import { Store } from '@ngrx/store';
import { selectAll } from './redux/reducer';
import {
  selectFilteredTodos,
  incompleteTodosLength,
  currentTodoTab,
} from './redux/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showDeleteModal = false;
  showLoader = true;
  selectedTodo: Todo | null = null;
  allTodos$!: Observable<Todo[]>;
  activeFilter: 'all' | 'active' | 'completed' = 'all';
  incompleteTodosLength$!: Observable<number>;
  activeTab$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.allTodos$ = this.store.select(selectFilteredTodos);
    this.activeTab$ = this.store.select(currentTodoTab);
    this.incompleteTodosLength$ = this.store.select(incompleteTodosLength);

    this.store.dispatch(enterTodosPage());
  }

  addTodo(newTodo: Todo) {
    console.log('parent', newTodo);
    this.store.dispatch(ADD_TODO({ todo: newTodo }));
  }

  deleteTodo(todoId: number): void {
    this.store.dispatch(DELETE_TODO({ id: todoId }));
    this.showDeleteModal = false;
  }
  markCompleted(todoId: number): void {
    this.store.dispatch(UPDATE_TODO({ id: todoId }));
    console.log(todoId);
  }
  handleUpdatedTodo(editInfo: { id: number; text: string }) {
    this.store.dispatch(EDIT_TODO({ id: editInfo.id, todo: editInfo.text }));
    console.log(editInfo.text);
  }
  clearCompleted(todoId: number): void {
    this.store.dispatch(CLEAR_COMPLETED_TODO({ id: todoId }));
    console.log(todoId);
  }

  filterTodos(filter: 'all' | 'active' | 'completed'): void {
    this.store.dispatch(SET_FILTER({ filter }));
  }
}
