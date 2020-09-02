import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '../../directives/dropdown/dropdown.module';




@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule, RouterModule, DropdownModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
