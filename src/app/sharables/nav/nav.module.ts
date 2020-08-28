import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { DropDownMenu } from 'src/app/directives/dropdown.directive';




@NgModule({
  declarations: [NavComponent, DropDownMenu],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
