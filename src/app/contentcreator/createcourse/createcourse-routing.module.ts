import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatecourseComponent } from './createcourse.component';

const routes: Routes = [{ path: '', component: CreatecourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatecourseRoutingModule { }
