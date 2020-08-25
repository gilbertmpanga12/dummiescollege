import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';


@NgModule({
  declarations: [InterviewsComponent],
  imports: [
    CommonModule,
    InterviewsRoutingModule
  ]
})
export class InterviewsModule { }
