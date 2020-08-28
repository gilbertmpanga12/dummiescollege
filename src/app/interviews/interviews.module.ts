import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';
import { NavModule } from '../sharables/nav/nav.module';
import { BottomnavModule } from '../sharables/bottomnav/bottomnav.module';


@NgModule({
  declarations: [InterviewsComponent],
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    NavModule,
    BottomnavModule
  ]
})
export class InterviewsModule { }
