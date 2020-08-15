import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseslistRoutingModule } from './courseslist-routing.module';
import { CourseslistComponent } from './courseslist.component';


@NgModule({
  declarations: [CourseslistComponent],
  imports: [
    CommonModule,
    CourseslistRoutingModule
  ]
})
export class CourseslistModule { }
