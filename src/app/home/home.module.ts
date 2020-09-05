import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {FloatingbuttonModule} from '../sharables/floatingbutton/floatingbutton.module';
import { VideoplayerModule } from '../sharables/videoplayer/videoplayer.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FloatingbuttonModule,
    VideoplayerModule
  ]
})
export class HomeModule { }
