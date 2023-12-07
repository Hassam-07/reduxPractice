import { Component, OnInit } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { Observable, catchError, startWith } from 'rxjs';
import { Todo } from './models/Todo';
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, EDIT_TODO, CLEAR_COMPLETED_TODO } from './redux/actions';
import { StoreService } from './redux/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showDeleteModal = false;
  showLoader = true;
  selectedTodo: Todo | null = null;

  get allTodos() {
    return this.store.select('todos');
  }
  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  addTodo(newTodo: any) {
    console.log('parent', newTodo);
    this.store.dispatch(ADD_TODO(newTodo));
  }

  deleteTodo(todoId: string): void {
    this.store.dispatch(DELETE_TODO(todoId));
    this.showDeleteModal = false;
  }
  markCompleted(todoId: string): void {
    this.store.dispatch(UPDATE_TODO(todoId));
    console.log(todoId);
  }
  handleUpdatedTodo(editInfo: { id: string; text: string }) {
    this.store.dispatch(EDIT_TODO(editInfo.id, editInfo.text));
    console.log(editInfo.text);
  }
  clearCompleted(todoId: string): void {
    this.store.dispatch(CLEAR_COMPLETED_TODO(todoId));
    console.log(todoId);
  }
}
