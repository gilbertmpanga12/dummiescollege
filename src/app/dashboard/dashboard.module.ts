import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailactivationModule} from '../emailactivation/emailactivation.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EmailactivationModule
  ]
})
export class DashboardModule { }
