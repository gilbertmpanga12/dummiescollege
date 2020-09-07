import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    this.service.isLoading = true;
    const payload = this.resetPasswordGroup.getRawValue();
    this.service.forgotPassword(payload['email']).then(res => {
      this.service.isLoading = false;
      this.toast('Check your email for link to reset password', 'success' ,5000);
    }).catch(err => {
           this.service.isLoading = false;
      if(err.code == 'auth/user-not-found'){
        this.toast('This account does not exist', 'error', 5000);
      }else if(err.code == 'auth/auth/wrong-password'){
        this.toast('Oops you entered the wrong password', 'error', 5000);
      }else{
        this.toast('Oops something went wrong, please check your network', 'error', 5000);
      }
    });
  }

  toast(message:string , operation: any, error:number){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: error,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    
    Toast.fire({
      icon: operation,
      title: message
    });
  }

}
