import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { Observable, catchError, of, startWith } from 'rxjs';
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
import { TodosState, selectAll } from './redux/reducer';
import {
  selectFilteredTodos,
  incompleteTodosLength,
  currentTodoTab,
  allTodosInfo,
} from './redux/state';
import { TodoActions } from './redux';
import { TodoService } from './redux/todo.service';

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
  todoInfo$!: Observable<any>;
  constructor(private store: Store, private todoServices: TodoService) {}
  errorMessage: string | null;
  ngOnInit(): void {
    this.getTodos();
    // this.store.dispatch(TodoActions.loadTodos());
    // this.allTodos$ = this.store.select(selectFilteredTodos);
    this.todoInfo$ = this.store.select(allTodosInfo);
    this.activeTab$ = this.store.select(currentTodoTab);
    this.incompleteTodosLength$ = this.store.select(incompleteTodosLength);
    // this.errorMessage$ = this.store.pipe(select('error', 'errorMessage'));
    this.store.dispatch(enterTodosPage());
  }
  getTodos() {
    this.todoServices
      .getAllTodos()
      .pipe(
        catchError((error) => {
          console.error('Error loading todos:', error);
          this.store.dispatch(
            TodoActions.loadTodosFail({
              ErrorText: 'Failed to load todos. Please try again.',
            })
          );

          return of([]);
        })
      )
      .subscribe((todos) => {
        this.store.dispatch(TodoActions.loadTodos());
      });
  }

  addTodo(newTodo: string) {
    console.log('parent', newTodo);
    this.store.dispatch(
      ADD_TODO({
        todo: {
          id: uuidv4(),
          name: newTodo,
          complete: false,
          editing: false,
        },
      })
    );
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
