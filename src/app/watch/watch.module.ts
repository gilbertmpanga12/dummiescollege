import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';

import { EmailactivationModule } from '../emailactivation/emailactivation.module';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';

@NgModule({
  declarations: [WatchComponent, VjsPlayerComponent],
  imports: [
    CommonModule,
    WatchRoutingModule,
    EmailactivationModule
  ]
})
export class WatchModule { }
