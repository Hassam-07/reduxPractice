import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() todos!: Todo[];
  @Input() showDeleteModal!: boolean;
  @Input() selectedTodo: Todo | null = null;
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() editTodoItem = new EventEmitter();
  @Output() pinTodoItem = new EventEmitter();
  @Output() markAsComplete = new EventEmitter<Todo>();
  @Output() clearcompletedItems = new EventEmitter<any>();
  todoIdToBeDeleted!: number | undefined;
  @Input() errorMessage = '';

  @Input() showLoader = true;
  pinnedTodos: Todo[] = [];
  unpinnedTodos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';
  constructor() {}

  // ngOnInit(): void {
  //   this.fetchTodos();
  // }
  ngOnInit(): void {
    this.showLoader = true;
  }
  ngOnChanges() {
    // if ((this.todos && this.todos.length > 0) || this.todos.length === 0) {
    //   this.showLoader = false;
    // }
  }

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }
  openDeleteQuestionConfirmationDialog(todoId: number) {
    this.todoIdToBeDeleted = todoId;
    this.showDeleteModal = true;
  }

  startEditing(todo: Todo) {
    todo.editing = true;
  }

  closeDeleteQuestionConfirmationDialog() {
    this.todoIdToBeDeleted = undefined;
    this.showDeleteModal = false;
  }
  deleteTodo(todoId: number | undefined) {
    this.deleteTodoItem.emit(todoId);
  }
  togglePin(todo: Todo) {
    this.pinTodoItem.emit(todo);
  }

  markCompleted(todo: Todo) {
    this.markAsComplete.emit(todo);
  }
  editTodo(todo: any) {
    todo.editing = true;
  }
  save(todo: Todo) {
    todo.editing = false;
  }
  update(todo: Todo) {
    todo.editing = false;
    this.editTodoItem.emit(todo);
  }

  clearCompleted() {
    this.clearcompletedItems.emit();
  }

  getFilteredTodos(): Todo[] {
    if (this.filter === 'active') {
      return this.todos.filter((todo) => !todo.complete);
    } else if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.complete);
    } else {
      return this.todos;
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
    if (filter === 'all') {
      this.filter = 'all';
    } else if (filter === 'active') {
      this.filter = 'active';
    } else if (filter === 'completed') {
      this.filter = 'completed';
    }
  }
}
