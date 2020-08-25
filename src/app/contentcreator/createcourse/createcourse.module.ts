import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatecourseRoutingModule } from './createcourse-routing.module';
import { CreatecourseComponent } from './createcourse.component';


@NgModule({
  declarations: [CreatecourseComponent],
  imports: [
    CommonModule,
    CreatecourseRoutingModule
  ]
})
export class CreatecourseModule { }
