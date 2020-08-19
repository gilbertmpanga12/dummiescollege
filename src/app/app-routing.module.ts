import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {AuthGuard} from './services/main.guard';

const routes: Routes = [
  {path: '',component: LayoutComponent,children: [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: 'my-resume', loadChildren:
     () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuard] },
     { path: 'notifications', loadChildren: 
    () => import('./notifications/notifications.module').then(m => m.NotificationsModule), canActivate:[AuthGuard] },
    { path: 'skills-and-work', loadChildren: () => import('./courseslist/courseslist.module')
    .then(m => m.CourseslistModule) },

    { path: 'watch', loadChildren: () => import('./watch/watch.module').then(m => m.WatchModule),
    canActivate:[AuthGuard]}
  ]}, 
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
