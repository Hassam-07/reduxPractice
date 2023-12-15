import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomVideoPlayerComponent } from './custom-video-player/custom-video-player.component';
// import { StoreService } from './redux/store.service';
<<<<<<< HEAD
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './redux/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import * as fromTodo from './redux/reducer';
import { TodoEffects } from './redux/todo.effects';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    TodoComponent,
    TodoListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ todos: todoReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TodoEffects]),
  ],
=======

@NgModule({
  declarations: [AppComponent, CustomVideoPlayerComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
>>>>>>> e14e206c786a33832c270c6c5bb74da45a607ece
  // providers: [StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
