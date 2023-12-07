import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentComponent } from '../app/content/content.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from './redux/store.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    TodoComponent,
    TodoListComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
