import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Student } from './models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
// import { firestore as ft } from 'firebase/app';
// import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  user: User;
  year: Date = new Date();
  userVerified: boolean = false;
  fullYear: number = this.year.getFullYear();
  isLoading: boolean = false;
  constructor(private auth: AngularFireAuth, 
    private router: Router, private firestore: AngularFirestore, 
    private http: HttpClient) {
      this.auth.authState.subscribe(user => {
        if (user){
          this.user = user;
          this.userVerified = user.emailVerified;
        }
      });
  }

  async login(email: string, password: string){
    await this.auth.signInWithEmailAndPassword(email,password);
    this.router.navigate(['/']);
  }

  async registerAccount(payload: Student){
   let user =  await this.auth.createUserWithEmailAndPassword(payload.email,payload.password);
   await this.firestore.collection('users').doc(user.user.uid).set({...payload});
   this.router.navigate(['/']);
  }

  

  async forgotPassword(email: string){
    return await this.auth.sendPasswordResetEmail(email);
  }

  async sendEmailVerification() {
    await (await this.auth.currentUser).sendEmailVerification();
    this.router.navigate(['/']);
  }

 




  

}
