import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Student} from '../../services/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationGroup: FormGroup;
  constructor(public service: MainService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationGroup = this._fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp(): void{
    const payload: Student = <Student>this.registrationGroup.getRawValue();
    this.service.registerAccount(payload);
  }
 
  validator(controlName: string): boolean {
    return this.registrationGroup.get(controlName).invalid && this.registrationGroup.get(controlName).touched;
  }

}
