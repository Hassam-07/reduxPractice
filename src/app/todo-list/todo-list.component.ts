import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../models/Todo';
import { StoreService } from '../redux/store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() todos!: Todo[] | null;
  @Input() showDeleteModal!: boolean;
  @Input() selectedTodo: Todo | null = null;
  @Output() deleteTodoItem = new EventEmitter();
  @Output() editTodoItem = new EventEmitter();
  @Output() pinTodoItem = new EventEmitter();
  @Output() markAsComplete = new EventEmitter();
  @Output() clearcompletedItems = new EventEmitter<any>();
  todoIdToBeDeleted!: string | undefined;
  @Input() errorMessage = '';

  @Input() showLoader = true;
  pinnedTodos: Todo[] = [];
  unpinnedTodos: Todo[] = [];
  editedText: string = '';
  filter: 'all' | 'active' | 'completed' = 'all';
  constructor(private store: StoreService) {}

  // ngOnInit(): void {
  //   this.fetchTodos();
  // }
  ngOnInit(): void {
    this.showLoader = true;
  }

  ngOnChanges() {
    if ((this.todos && this.todos.length > 0) || this.todos?.length === 0) {
      this.showLoader = false;
    }
  }

  openDeleteQuestionConfirmationDialog(todoId: string) {
    this.todoIdToBeDeleted = todoId;
    this.showDeleteModal = true;
    console.log(todoId);
  }

  // startEditing(todo: Todo) {
  //   todo.editing = true;
  // }

  closeDeleteQuestionConfirmationDialog() {
    this.todoIdToBeDeleted = undefined;
    this.showDeleteModal = false;
  }
  deleteTodo() {
    this.deleteTodoItem.emit(this.todoIdToBeDeleted);
    this.todoIdToBeDeleted = undefined;
    this.showDeleteModal = false;
  }
  togglePin(todo: Todo) {
    this.pinTodoItem.emit(todo);
  }

  markCompleted(todo: string) {
    this.markAsComplete.emit(todo);
  }
  editTodo(todo: Todo) {
    this.editedText = todo.name; // Initialize editedText with the current todo name
    todo.editing = true;
  }

  save(todo: Todo) {
    todo.name = this.editedText; // Update the todo name with the edited text
    todo.editing = false;
  }

  update(todo: Todo) {
    todo.editing = false;
    this.editTodoItem.emit({ id: todo.id, text: todo.name });
  }
  clearCompleted() {
    this.clearcompletedItems.emit();
  }
}
