import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';
import {VideoplayerModule} from '../sharables/videoplayer/videoplayer.module';
import { EmailactivationModule } from '../emailactivation/emailactivation.module';


@NgModule({
  declarations: [WatchComponent],
  imports: [
    CommonModule,
    WatchRoutingModule,
    EmailactivationModule,
    VideoplayerModule
  ]
})
export class WatchModule { }
