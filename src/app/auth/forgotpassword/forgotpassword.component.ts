import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  resetPasswordGroup: FormGroup;
  constructor(public service: MainService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.resetPasswordGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword(): void{
    const payload = this.resetPasswordGroup.getRawValue();
  }

}
