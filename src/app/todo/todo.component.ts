import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Todo } from '../models/Todo';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Output() addTodoItem = new EventEmitter<any>();
  @Input() todoInput!: string;

  addTodo(todoForm: NgForm) {
    this.addTodoItem.emit(todoForm.value.name);

    todoForm.reset();
  }
}
// if (this.todoForm.valid) {
//   const newTodo = this.todoForm.value.name;
//   this.todoForm.reset();
//   this.addTodoItem.emit(newTodo);
// }

// @Output() formValue = new EventEmitter();

// todoForm: FormGroup = this.fb.group({
//   name: ['', Validators.required],
// });
// todos: Todo[] = [];

// constructor(private fb: FormBuilder, private store: Store) {}

// ngOnInit(): void {
//   this.todoForm = this.fb.group({
//     name: ['', Validators.required],
//   });
// }
