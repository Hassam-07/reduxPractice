import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Output() addTodoItem = new EventEmitter<any>();

  todoForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });
  todos: Todo[] = [];
  data: any;
  isLoading = false;
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      const newTodo = this.todoForm.value;
      this.todoForm.reset();
      this.addTodoItem.emit(newTodo);
    }
  }
}
