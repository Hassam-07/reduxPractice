import { Component, OnInit } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { Observable, catchError, startWith } from 'rxjs';
import { Todo } from './models/Todo';
import { Store } from '@ngrx/store';
import { AddTodo, DeleteTodo } from './redux/actions';
import { TodosState } from './redux/reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showDeleteModal = false;
  showLoader = true;
  selectedTodo: Todo | null = null;
  allTodos: Todo[] = [
    {
      id: 1,
      name: 'hassam',
      complete: false,
      pinned: false,
      editing: false,
    },
    {
      id: 2,
      name: 'qayyum',
      complete: false,
      pinned: false,
      editing: false,
    },
    {
      id: 3,
      name: 'jj',
      complete: false,
      pinned: false,
      editing: false,
    },
  ];

  constructor(private store: Store<TodosState>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.todos)
      .subscribe((todos) => {
        this.allTodos = todos;
      });
  }

  addTodo(newTodo: Todo) {
    this.store.dispatch(new AddTodo({ todo: newTodo }));
    console.log(newTodo);
  }

  deleteTodo(todoId: number) {
    this.store.dispatch(new DeleteTodo({ id: todoId }));
  }

  clearCompleted(todoId: number) {
    this.store.dispatch(new DeleteTodo({ id: todoId }));
  }
}
