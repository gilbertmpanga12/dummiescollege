import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingbuttonComponent } from './floatingbutton/floatingbutton.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [FloatingbuttonComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FloatingbuttonComponent]
})
export class FloatingbuttonModule { }
