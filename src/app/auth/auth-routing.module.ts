import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import {LoginComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


const routes: Routes = [{ path: '', component: AuthComponent , children: [
  {
    path: '',
    component: LoginComponent,
    data: {animation: 'LoginPage'}
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: {animation: 'RegisterPage'}
  },
  {
    path: 'forgot-password',
    component: ForgotpasswordComponent,
    data: {animation: 'ForgotpasswordPage'}
  }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
