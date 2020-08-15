import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';
import { CourseintroComponent } from './courseintro/courseintro.component';
import {YouTubePlayerModule} from '@angular/youtube-player';

@NgModule({
  declarations: [WatchComponent, CourseintroComponent],
  imports: [
    CommonModule,
    WatchRoutingModule,
    YouTubePlayerModule
  ]
})
export class WatchModule { }