import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from '../models/Todo';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { SET_FILTER } from '../redux/todo.actions';
import { TodosState } from '../redux/reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todos!: Todo[] | null;
  @Input() incompleteTodos!: number | null;
  @Input() showDeleteModal!: boolean;
  @Input() selectedTodo: Todo | null = null;
  @Output() deleteTodoItem = new EventEmitter();
  @Output() editTodoItem = new EventEmitter();
  @Output() pinTodoItem = new EventEmitter();
  @Output() closeBtn = new EventEmitter();
  @Output() markAsComplete = new EventEmitter();
  @Output() clearcompletedItems = new EventEmitter<any>();
  todoIdToBeDeleted!: number | undefined;
  @Input() errorMessage = '';
  @Input() activeFilter!: string | null;
  @Input() showLoader = true;
  pinnedTodos: Todo[] = [];
  unpinnedTodos: Todo[] = [];
  editedText: string = '';

  constructor(private store: Store, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.showLoader = true;
  }

  openDeleteQuestionConfirmationDialog(todoId: number) {
    this.todoIdToBeDeleted = todoId;
    this.showDeleteModal = true;
    console.log(todoId);
  }

  closeDeleteQuestionConfirmationDialog() {
    this.todoIdToBeDeleted = undefined;
    this.showDeleteModal = false;
  }
  // deleteTodo() {
  //   this.deleteTodoItem.emit(this.todoIdToBeDeleted);
  //   this.todoIdToBeDeleted = undefined;
  //   this.showDeleteModal = false;
  // }
  // deleteTodo() {
  //   const deletedTodo = this.todos.find(
  //     (todo) => todo.id === this.todoIdToBeDeleted
  //   );
  //   if (deletedTodo) {
  //     this.deleteTodoItem.emit(deletedTodo);
  //     this.todoIdToBeDeleted = undefined;
  //     this.showDeleteModal = false;
  //   }
  // }
  deleteTodo() {
    const deletedTodo = this.todos.find(
      (todo) => todo.id === this.todoIdToBeDeleted
    );
    if (deletedTodo) {
      // this.todoIdToBeDeleted = deletedTodo.id;
      console.log(deletedTodo.id);
      this.deleteTodoItem.emit({ id: deletedTodo.id }); // Pass the whole todo object as payload
      this.todoIdToBeDeleted = undefined;
      this.showDeleteModal = false;
    }
  }

  close(): void {
    this.closeBtn.emit();
  }
  togglePin(todo: Todo) {
    this.pinTodoItem.emit(todo);
  }

  markCompleted(todo: Todo) {
    this.markAsComplete.emit(todo);
  }

  editTodo(todo: Todo) {
    this.editTodoItem.emit(todo);
    console.log(todo);
  }

  clearCompleted() {
    this.clearcompletedItems.emit();
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.activeFilter = filter;
    this.store.dispatch(SET_FILTER({ filter }));
  }
}
