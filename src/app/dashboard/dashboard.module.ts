import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailactivationModule} from '../emailactivation/emailactivation.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FloatingbuttonModule } from '../sharables/floatingbutton/floatingbutton.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EmailactivationModule,
    FloatingbuttonModule
  ]
})
export class DashboardModule { }
