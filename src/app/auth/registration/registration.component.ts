import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      password: ['', [Validators.required, Validators.maxLength(6)]]
    });
  }

  signUp(): void{
    const payload = this.registrationGroup.getRawValue();
  }

}
