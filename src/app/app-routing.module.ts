import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {AuthGuard} from './services/main.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: '',component: LayoutComponent,children: [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: {animation: 'HomePage'}},
    { path: 'my-resume', loadChildren:
     () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuard], 
     data: {animation: 'ResumePage'}
      },
     {data: {animation: 'NotificationsPage'}, path: 'notifications', loadChildren: 
    () => import('./notifications/notifications.module').then(m => m.NotificationsModule), canActivate:[AuthGuard] },
    { path: 'skills-and-work', loadChildren: () => import('./courseslist/courseslist.module')
    .then(m => m.CourseslistModule) },

    {data: {animation: 'WatchPage'}, path: 'watch', loadChildren: () => import('./watch/watch.module').then(m => m.WatchModule)
    },// canActivate:[AuthGuard]
  ]}, 
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'interviews', loadChildren: () => import('./interviews/interviews.module').then(m => m.InterviewsModule) },
  { path: 'dashboard', loadChildren: () => import('./contentcreator/contentcreatordash/contentcreatordash.module').then(m => m.ContentcreatordashModule) },
  { path: 'courses', loadChildren: 
  () => import('./contentcreator/courses/courses.module') // canActivate:[AuthGuard],
  .then(m => m.CoursesModule) , canActivate:[AuthGuard]},
  { path: 'createcourse', 
  loadChildren: () => import('./contentcreator/createcourse/createcourse.module')
  .then(m => m.CreatecourseModule),canActivate:[AuthGuard] },
  {path: '**', component: PagenotfoundComponent, pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
