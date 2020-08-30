import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { RouterModule } from '@angular/router';
import { NavModule } from 'src/app/sharables/nav/nav.module';
import { BottomnavModule } from 'src/app/sharables/bottomnav/bottomnav.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Questionpart2Component } from './questionpart2/questionpart2.component';


@NgModule({
  declarations: [QuestionsComponent, Questionpart2Component],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    RouterModule,
    NavModule,
    BottomnavModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule { }
