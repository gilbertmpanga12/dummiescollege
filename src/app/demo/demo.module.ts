import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo/demo.component';
import {VideoplayerModule} from '../sharables/videoplayer/videoplayer.module';
import {DemoRoutingModule} from './demo-routing.module';
import { NavModule } from '../sharables/nav/nav.module';
import { BottomnavModule } from '../sharables/bottomnav/bottomnav.module';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule, 
    VideoplayerModule,
    DemoRoutingModule,
    NavModule,
    BottomnavModule
  ]
})
export class DemoModule { }
