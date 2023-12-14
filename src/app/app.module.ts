import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomVideoPlayerComponent } from './custom-video-player/custom-video-player.component';
// import { StoreService } from './redux/store.service';

@NgModule({
  declarations: [AppComponent, CustomVideoPlayerComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  // providers: [StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
