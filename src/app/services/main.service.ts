import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';//AngularFirestoreDocument
import { Student, Certificates, Skills } from './models';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
// import { firestore as ft } from 'firebase/app';
// import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  showMobileMenu: boolean = false;
  user: User;
  year: Date = new Date();
  userVerified: boolean = false;
  fullYear: number = this.year.getFullYear();
  isLoading: boolean = false;
  constructor(private auth: AngularFireAuth, 
    private router: Router, private firestore: AngularFirestore) {
      this.auth.authState.subscribe(user => {
        if (user){
          this.user = user;
          this.userVerified = user.emailVerified;
          localStorage.setItem('userId',user.uid);
        }
      });
  }

  async login(email: string, password: string){
    await this.auth.signInWithEmailAndPassword(email,password);
    const lastUrl = localStorage.getItem('lastUrl');
    if(lastUrl != null){
      this.router.navigate(['/' + lastUrl]);
      localStorage.removeItem('lastUrl');
      return;
    }

    this.router.navigate(['/']);
  }

  async registerAccount(payload: Student){
   let user =  await this.auth.createUserWithEmailAndPassword(payload.email,payload.password);
   user.user.updateProfile({displayName: payload.fullName});
   await this.firestore.collection('users').doc(user.user.uid).set({...payload});
   this.router.navigate(['/']);
  }

  async userSignedIn() {
    await this.auth.currentUser;
  }

  async forgotPassword(email: string){
    return await this.auth.sendPasswordResetEmail(email);
  }

  async sendEmailVerification() {
    await (await this.auth.currentUser).sendEmailVerification();
    this.router.navigate(['/']);
  }

   async resendEmailLink(){
    await (await this.auth.currentUser).sendEmailVerification();
  }

  async logout(){
    await this.auth.signOut();
  }

  get userId(): string {
    return localStorage.getItem('userId');
  }

 async updateUserProfilePicture(url: string){

  let user = await this.auth.currentUser;
  user.updateProfile({photoURL: url});
   await this.firestore.doc('users' + '/' + user.uid).set({profilePicture: url}, {merge: true});
 }


  

}
