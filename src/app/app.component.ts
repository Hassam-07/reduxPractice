import { Component, OnInit } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { Observable, catchError, startWith } from 'rxjs';
import { Todo } from './models/Todo';
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_FILTER,
  CLEAR_COMPLETED_TODO,
} from './redux/actions';
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
  allTodos$: Observable<Todo[]>;
  activeFilter: 'all' | 'active' | 'completed' = 'all';
  incompleteTodosLength$: Observable<number>;
  activeTab$: Observable<string>;

  constructor(private store: Store) {
    this.allTodos$ = store.select(selectFilteredTodos);
    this.activeTab$ = store.select(currentTodoTab);
    this.incompleteTodosLength$ = this.store.select(incompleteTodosLength);
  }

  ngOnInit(): void {}

  addTodo(newTodo: string) {
    console.log('parent', newTodo);
    this.store.dispatch(ADD_TODO({ todo: newTodo }));
  }

  deleteTodo(todoId: string): void {
    this.store.dispatch(DELETE_TODO({ id: todoId }));
    this.showDeleteModal = false;
  }
  markCompleted(todoId: string): void {
    this.store.dispatch(UPDATE_TODO({ id: todoId }));
    console.log(todoId);
  }
  handleUpdatedTodo(editInfo: { id: string; text: string }) {
    this.store.dispatch(EDIT_TODO({ id: editInfo.id, todo: editInfo.text }));
    console.log(editInfo.text);
  }
  clearCompleted(todoId: string): void {
    this.store.dispatch(CLEAR_COMPLETED_TODO({ id: todoId }));
    console.log(todoId);
  }

  filterTodos(filter: 'all' | 'active' | 'completed'): void {
    this.store.dispatch(SET_FILTER({ filter }));
  }
}
