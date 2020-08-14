import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path: '',component: LayoutComponent,children: [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: 'skills-and-work', loadChildren:
     () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
     { path: 'notifications', loadChildren: 
    () => import('./notifications/notifications.module').then(m => m.NotificationsModule) }
  ]}, 
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
