import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailactivationModule} from '../emailactivation/emailactivation.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';


@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    EmailactivationModule
  ]
})
export class NotificationsModule { }
