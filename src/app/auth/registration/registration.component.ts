import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Student} from '../../services/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationGroup: FormGroup;
  countries: string[] = [];
  constructor(public service: MainService, private _fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registrationGroup = this._fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp(): void{
    this.service.isLoading = true;
    const payload: Student = <Student>this.registrationGroup.getRawValue();
    this.service.getCountry();
    // this.service.registerAccount(payload).then(resp => {
    // this.service.isLoading = false;
    // }).catch(err => {
    //   this.service.isLoading = false;
    //   this.toastr.error('Whoops!', err, {
    //     timeOut: 4000,
    //   });
    // });
  }
 
  validator(controlName: string): boolean {
    return this.registrationGroup.get(controlName).invalid && this.registrationGroup.get(controlName).touched;
  }

}
