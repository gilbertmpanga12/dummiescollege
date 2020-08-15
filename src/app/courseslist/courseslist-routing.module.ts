import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseslistComponent } from './courseslist.component';

const routes: Routes = [{ path: '', component: CourseslistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseslistRoutingModule { }
