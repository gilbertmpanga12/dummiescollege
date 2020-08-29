import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavModule} from '../../sharables/nav/nav.module';
import { ContentcreatordashRoutingModule } from './contentcreatordash-routing.module';
import { ContentcreatordashComponent } from './contentcreatordash.component';
import {BottomnavModule} from '../../sharables/bottomnav/bottomnav.module';
import {SidebarModule} from '../../sharables/sidebar/sidebar.module';
@NgModule({
  declarations: [ContentcreatordashComponent],
  imports: [
    CommonModule,
    ContentcreatordashRoutingModule,
    NavModule,
    BottomnavModule,
    SidebarModule
  ]
})
export class ContentcreatordashModule { }
