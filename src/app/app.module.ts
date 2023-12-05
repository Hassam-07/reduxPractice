import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentComponent } from '../app/content/content.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './redux/reducer';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    TodoComponent,
    TodoListComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, StoreModule.forRoot({})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
