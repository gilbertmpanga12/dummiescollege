import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentcreatordashComponent } from './contentcreatordash.component';

const routes: Routes = [{ path: '', component: ContentcreatordashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentcreatordashRoutingModule { }
