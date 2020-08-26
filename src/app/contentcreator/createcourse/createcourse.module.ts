import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatecourseRoutingModule } from './createcourse-routing.module';
import { CreatecourseComponent } from './createcourse.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FinishupComponent } from './finishup/finishup.component';
import { NavModule } from 'src/app/sharables/nav/nav.module';
import { BottomnavModule } from 'src/app/sharables/bottomnav/bottomnav.module';


@NgModule({
  declarations: [CreatecourseComponent, WelcomeComponent, FinishupComponent],
  imports: [
    CommonModule,
    CreatecourseRoutingModule,
    NavModule,
    BottomnavModule
  ]
})
export class CreatecourseModule { }
