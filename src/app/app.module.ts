import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CustomVideoPlayerComponent } from './custom-video-player/custom-video-player.component';
// import { StoreService } from './redux/store.service';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './redux/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import * as fromTodo from './redux/reducer';
import { TodoEffects } from './redux/todo.effects';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, TodoComponent, TodoListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ todos: todoReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TodoEffects]),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  // providers: [StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
