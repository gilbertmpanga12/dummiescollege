import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { NavModule } from 'src/app/sharables/nav/nav.module';
import { BottomnavModule } from 'src/app/sharables/bottomnav/bottomnav.module';
import { FloatingbuttonModule } from 'src/app/sharables/floatingbutton/floatingbutton.module';


@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NavModule,
    BottomnavModule,
    FloatingbuttonModule
  ]
})
export class CoursesModule { }
