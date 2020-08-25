import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentcreatordashRoutingModule } from './contentcreatordash-routing.module';
import { ContentcreatordashComponent } from './contentcreatordash.component';


@NgModule({
  declarations: [ContentcreatordashComponent],
  imports: [
    CommonModule,
    ContentcreatordashRoutingModule
  ]
})
export class ContentcreatordashModule { }
