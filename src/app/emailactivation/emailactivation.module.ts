import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailactivationComponent } from './emailactivation/emailactivation.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmailactivationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EmailactivationComponent]
})
export class EmailactivationModule { }
