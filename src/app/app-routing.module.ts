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
  { path: 'categories',data: {animation: 'CategoriesPage'}, 
  loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'interviews',data:{animation: 'InterviewsPage'}, loadChildren: () => import('./interviews/interviews.module').then(m => m.InterviewsModule) },
  { path: 'dashboard',data: {animation: 'DashboardPage'}, loadChildren: () => import('./contentcreator/contentcreatordash/contentcreatordash.module').then(m => m.ContentcreatordashModule) },
  { path: 'courses',data: {animation: 'CoursesPage'}, loadChildren: 
  () => import('./contentcreator/courses/courses.module') // canActivate:[AuthGuard],
  .then(m => m.CoursesModule) , canActivate:[AuthGuard]},
  { path: 'createcourse',  data: {animation: 'CreateCoursePage'},
  loadChildren: () => import('./contentcreator/createcourse/createcourse.module')
  .then(m => m.CreatecourseModule)},
  { path: 'questions',data: {animation: 'QuestionsPage'}, loadChildren: () => import('./contentcreator/questions/questions.module').then(m => m.QuestionsModule) },// ,canActivate:[AuthGuard] 
  {path: '**', component: PagenotfoundComponent, pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
