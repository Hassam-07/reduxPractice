import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { Observable, catchError, of, startWith } from 'rxjs';
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
import { Store } from '@ngrx/store';
import { TodosState } from './redux/reducer';

import { TodoActions } from './redux';
import { TodoService } from './redux/todo.service';
import {
  selectFilteredTodos,
  currentTodoTab,
  incompleteTodosLength,
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
  ngOnInit(): void {
    this.getTodos();
    // this.store.dispatch(TodoActions.loadTodos());
    this.allTodos$ = this.store.select(selectFilteredTodos);
    // this.todoInfo$ = this.store.select(allTodosInfo);
    this.activeTab$ = this.store.select(currentTodoTab);
    this.incompleteTodosLength$ = this.store.select(incompleteTodosLength);
    // this.errorMessage$ = this.store.pipe(select('error', 'errorMessage'));
    this.store.dispatch(enterTodosPage());
  }
  getTodos() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  editTodo(todo: Todo) {
    this.selectedTodo = todo;
    this.todoInput = todo.name;
  }
  addTodo(newTodo: string) {
    if (newTodo) {
      if (this.selectedTodo) {
        // Editing existing todo
        let updatedTask: Todo = {
          ...this.selectedTodo,
          name: newTodo,
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
            todo: {
              id: uuidv4(),
              name: newTodo,
              complete: false,
            },
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

  deleteTodo(todoId: string): void {
    this.store.dispatch(DELETE_TODO({ id: todoId }));
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
