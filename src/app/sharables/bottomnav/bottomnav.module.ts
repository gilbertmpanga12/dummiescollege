import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomnavComponent } from './bottomnav/bottomnav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BottomnavComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BottomnavComponent]
})
export class BottomnavModule { }
