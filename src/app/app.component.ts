import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { Observable, catchError, filter, map, of, startWith, take } from 'rxjs';
import { Todo } from './models/Todo';
import {
  ADD_TODO,
  markAsCompleted,
  DELETE_TODO,
  EDIT_TODO,
  SET_FILTER,
  CLEAR_COMPLETED_TODO,
  enterTodosPage,
} from './redux/todo.actions';
import { Store, select } from '@ngrx/store';
import { TodosState } from './redux/reducer';

import { TodoActions } from './redux';
import { TodoService } from './redux/todo.service';
import {
  selectFilteredTodos,
  currentTodoTab,
  incompleteTodosLength,
  selectDeletedTodo,
  selectTodosSortedByIndex,
} from './redux/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showDeleteModal = false;
  showLoader = true;
  selectedTodo: Todo | null = null;
  todoInput = '';
  allTodos$!: Observable<Todo[]>;
  activeFilter: 'all' | 'active' | 'completed' = 'all';
  incompleteTodosLength$!: Observable<number>;
  activeTab$!: Observable<string>;
  todoInfo$!: Observable<any>;
  constructor(private store: Store, private todoServices: TodoService) {}
  errorMessage: string | null;
  // todos$: Observable<Todo[]>;
  ngOnInit(): void {
    this.getTodos();
    this.allTodos$ = this.store.select(selectFilteredTodos);
    this.activeTab$ = this.store.select(currentTodoTab);
    // this.todos$ = this.store.select(selectTodosSortedByIndex);
    this.incompleteTodosLength$ = this.store.select(incompleteTodosLength);
    this.store.dispatch(enterTodosPage());
  }
  getTodos() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  editTodo(todo: Todo) {
    this.selectedTodo = todo;
    this.todoInput = todo.name;
  }
  addTodo(newTodo: Todo) {
    if (newTodo) {
      if (this.selectedTodo) {
        // Editing existing todo
        let updatedTask: Todo = {
          ...this.selectedTodo,
          name: newTodo.name,
        };

        this.store.dispatch(
          TodoActions.EDIT_TODO({
            id: updatedTask.id,
            todo: updatedTask,
          })
        );

        // Clear the selectedTodo and todoInput
        this.selectedTodo = null;
        this.todoInput = '';
      } else {
        this.store.dispatch(
          ADD_TODO({
            todo: newTodo,
          })
        );
      }
    }
    console.log('parent', newTodo);
    console.log(newTodo);
  }

  closeBtn() {
    this.store.dispatch(TodoActions.removeErrorModal());
  }

  deleteTodo(todo: Todo): void {
    // Update Todo to match your Todo model
    console.log('app console', todo.id);
    this.store.dispatch(DELETE_TODO({ id: todo.id }));
    this.showDeleteModal = false;
  }
  markCompleted(todo: Todo): void {
    this.store.dispatch(markAsCompleted({ id: todo.id, todo: todo }));
    console.log(todo);
  }

  clearCompleted() {
    this.store.dispatch(CLEAR_COMPLETED_TODO());
  }

  filterTodos(filter: 'all' | 'active' | 'completed'): void {
    this.store.dispatch(SET_FILTER({ filter }));
  }
}
