import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  type: string = 'password';
  isFocused: boolean = false;
  
  invalidFields: boolean = false;
  constructor(public service: MainService, private _fb: FormBuilder, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.loginGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    const payload = this.loginGroup.getRawValue();
    if(this.loginGroup.invalid){
      this.invalidFields = true;
     return;
    }
    this.invalidFields = false;
    this.service.isLoading = true;
    this.service.login(payload['email'],payload['password']).then(resp => {
      this.service.isLoading = false;
    }).catch(err => {
      this.service.isLoading = false;
      this.service.showError(err);
    });
  }

 validator(controlName: string): boolean{
    return this.loginGroup.get(controlName).touched && this.loginGroup.get(controlName).invalid;
 } 

  isSelected(controlName: string): boolean{
    return this.loginGroup.get(controlName).dirty;
  }
  
  unfocus(): void{
    this.isFocused = false;
  }

  focus(): void{
    this.isFocused = true;
  }
  
  showPassword(): void{
    this.type = 'text';
  }
  Hidepassword(): void{
    this.type = 'password';
  }
}
