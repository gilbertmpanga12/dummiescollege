import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownMenu} from '../dropdown.directive';


@NgModule({
  declarations: [DropDownMenu],
  imports: [
    CommonModule
  ],
  exports: [DropDownMenu]
})
export class DropdownModule { }
