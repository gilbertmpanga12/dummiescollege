import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '../../directives/dropdown/dropdown.module';
import { NgAisModule } from 'angular-instantsearch';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule, RouterModule, DropdownModule, NgAisModule.forRoot()
  ],
  exports: [NavComponent]
})
export class NavModule { }
