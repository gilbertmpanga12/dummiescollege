import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {FloatingbuttonModule} from '../sharables/floatingbutton/floatingbutton.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FloatingbuttonModule
  ]
})
export class HomeModule { }
