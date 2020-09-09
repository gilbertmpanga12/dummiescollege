import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VjsPlayerComponent} from './vjs-player/vjs-player.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [VjsPlayerComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [VjsPlayerComponent]
})
export class VideoplayerModule { }
