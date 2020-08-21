import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emailactivation',
  templateUrl: './emailactivation.component.html',
  styleUrls: ['./emailactivation.component.scss']
})
export class EmailactivationComponent implements OnInit {
  emailActivationGroup: FormGroup;
  constructor(private _fb: FormBuilder, public service: MainService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.emailActivationGroup  = this._fb.group({
      email : ['', [Validators.email, Validators.required]]
    });
  }

  resendEmail(): void{
    if(this.emailActivationGroup.valid){
      this.service.isLoading = true;
    this.service.resendEmailLink().then((resp) => {
      this.service.isLoading = false;
      this.emailActivationGroup.reset();
      this.toastr.success('Great!', 'Confirmation link has been sent to your email');
    } ).catch(err => {
      this.service.isLoading = false;
      this.toastr.error('Oops', err, {
        timeOut: 3000,
      });
    });
    }
  

  }

  validator(controlName: string): boolean{
    return this.emailActivationGroup.get('email').invalid && this.emailActivationGroup.get('email').touched
  }

}
