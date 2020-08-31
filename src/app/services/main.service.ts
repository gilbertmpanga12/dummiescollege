import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';//AngularFirestoreDocument
import { Student, Certificates, Skills, Course } from './models';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
// import { firestore as ft } from 'firebase/app';
// import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  showMobileMenu: boolean = false;
  // showCourseForm: boolean = true;
  user: User;
  year: Date = new Date();
  userVerified: boolean = false;
  fullYear: number = this.year.getFullYear();
  isLoading: boolean = false;
  constructor(private auth: AngularFireAuth, 
    private router: Router, private firestore: AngularFirestore, private toastr: ToastrService) {
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

 async createCourse(payload: Course){
  this.isLoading = true;
  const randomId = `${Math.ceil(Math.random() * 100000000000)}`;
  let user = await this.auth.currentUser;
  await this.firestore.collection('courses')
  .doc(randomId).set({title:payload.title, 
  caption: payload.caption, uid: user.uid, docId: randomId, 
  grade: 0, size: 0}, {merge: true});
   this.isLoading = false;
   localStorage.setItem('hasTitle', 'true');
   localStorage.setItem('uploadCount', '0');
   localStorage.setItem('uploadId', randomId);
 }

get hasCreatedTitle(): boolean{
  let hasTitle = localStorage.getItem('hasTitle');
  return hasTitle == 'true';
}

get uploadsCount(): number{
  let count = localStorage.getItem('uploadCount');
  return parseInt(count);
}

async saveMediaUrl(path: string){
  let firebaseUser = await this.auth.currentUser;
  let user = localStorage.getItem('uploadId');
  
  try{
  await this.firestore.collection('courses').doc(user)
  .collection('videos').doc(user).set({
    videoUrl: path,
    questions: [],
    docId: user,
    uid: firebaseUser.uid
  }, 
  {merge: true});
  this.isLoading = false;
  this.router.navigate(['/questions']);
  this.toastr.info('Great! Now attach interview questions', '',{
    timeOut: 5000
  });
 }catch(e){
  this.isLoading = false;
  this.showError(e);
 }

}

async saveQuestions(payload:any, correctAnswerA: string, correctAnswerB){
  try{
    console.log(correctAnswerB, 'B');
    console.log(correctAnswerA, 'A')
    this.isLoading = true;
    let firebaseUser = await this.auth.currentUser;
    let user = localStorage.getItem('uploadId');
    await this.firestore.collection('courses').doc(user)
    .collection('videos').doc(user).set({
      questions: payload,
      correctAnswerA: correctAnswerA,
      correctAnswerB: correctAnswerB
    }, {merge: true});
    this.isLoading = false;
    this.router.navigate(['/createcourse']);
    this.toastr.info('Questions set successfully');
    localStorage.removeItem('question1Filled');
    localStorage.removeItem('correctAnswerA');
    localStorage.removeItem('question1');
  }catch(e){
    this.showError('something went wrong');
    this.isLoading = false;
    console.log(e);
  }
}

randomUp(number: number): number{
  return Math.ceil(Math.floor(number));
}



showError(message:string): void{
  this.toastr.error('Whoops!', message, {
    timeOut: 4000,
    
  });
}

async cancelUpload() {
const user = localStorage.getItem('uploadId');
 await this.firestore.collection('courses')
  .doc(user).delete();
}

get filledInquestion1(): boolean {
  const hasFilled = localStorage.getItem('question1Filled');
  return hasFilled == 'true';
}


  

}
