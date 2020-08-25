import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MainService } from '../services/main.service';
import { ContentcreatorComponent } from './contentcreator/contentcreator.component';


@NgModule({
  declarations: [AuthComponent,
     RegistrationComponent, LoginComponent, ForgotpasswordComponent, ContentcreatorComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ MainService]
})
export class AuthModule { }
