import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavModule} from '../../sharables/nav/nav.module';
import { ContentcreatordashRoutingModule } from './contentcreatordash-routing.module';
import { ContentcreatordashComponent } from './contentcreatordash.component';


@NgModule({
  declarations: [ContentcreatordashComponent],
  imports: [
    CommonModule,
    ContentcreatordashRoutingModule,
    NavModule
  ]
})
export class ContentcreatordashModule { }
