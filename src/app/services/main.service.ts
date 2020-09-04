import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';//AngularFirestoreDocument
import { Student, Certificates, Skills, Course } from './models';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { tap, timestamp } from 'rxjs/operators';

// import { firestore as ft } from 'firebase/app';
// import { Observable, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import * as algoliasearch from 'algoliasearch';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



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
  isErrorLoading: boolean = false;
  constructor(private auth: AngularFireAuth, 
    private router: Router, private firestore: AngularFirestore, private http: HttpClient) {
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
     try{
       this.isLoading = true;
       await this.auth.sendPasswordResetEmail(email);
       this.isLoading = false;
       this.toast('Password reset link sent to your email', 'success');
     }catch(e){
      this.isLoading = false;
      this.showError('something went wrong');
     }
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
    window.location.reload();
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
  try{
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
   localStorage.setItem('course', JSON.stringify({title:payload.title, 
    caption: payload.caption, uid: user.uid, docId: randomId, 
    grade: 0, size: 0, intro: ''}));
  }catch(e){
    this.toast('Oops something went wrong', 'error');
  }
 }




get hasCreatedTitle(): boolean{
  let hasTitle = localStorage.getItem('hasTitle');
  return hasTitle == 'true';
}

get uploadsCount(): number{
  let count = localStorage.getItem('uploadCount');
  return parseInt(count);
}




async saveMediaUrl(path: string, videoTitle: string){
  let firebaseUser = await this.auth.currentUser;
  let user = localStorage.getItem('uploadId');
  var childId;

  if(localStorage.getItem('childId')){
    childId =  localStorage.getItem('childId');
  }else{
    childId = `${Math.ceil(Math.random() * 100000000000)}`;
    localStorage.setItem('childId', `${Math.ceil(Math.random() * 100000000000)}`);
  }
  
  try{
  await this.firestore.collection('courses').doc(user)
  .collection('videos').add({
    videoUrl: path,
    questions: [],
    docId: user,
    uid: firebaseUser.uid,
    videoTitle: videoTitle
  });
  // if(this.uploadsCount == 0){
  //   await this.firestore.collection('courses').doc(user).update({intro: path});
  // }
  this.isLoading = false;
  this.router.navigate(['/questions']);
  this.toast('Great! Now attach interview questions', 'info');
  
 }catch(e){
  this.isLoading = false;
  this.showError(e);
 }

}

async saveQuestions(payload:any, correctAnswerA: string, correctAnswerB){
  try{
       this.isLoading = true;
    let firebaseUser = await this.auth.currentUser;
    let user = localStorage.getItem('uploadId');
    let uploadCount = this.uploadsCount + 1;

    if(uploadCount == 15){
       this.seedDocument(); // payload data 
    }
    await this.firestore.collection('courses').doc(user)
    .collection('videos').doc(user).set({
      questions: payload,
      correctAnswerA: correctAnswerA,
      correctAnswerB: correctAnswerB
    }, {merge: true});
    this.isLoading = false;
    localStorage.setItem('uploadCount', `${uploadCount}`);
    this.router.navigate(['/createcourse']);
    this.toast('Questions set successfully', 'info');
    localStorage.removeItem('question1Filled');
    // localStorage.removeItem('correctAnswerA');
    // localStorage.removeItem('question1');
    // localStorage.removeItem('course');
    
    
  }catch(e){
    this.showError('something went wrong');
    this.isLoading = false;
  }
}

async seedDocument(){
  const course = JSON.parse(localStorage.getItem('course'));
  const firebaseUser = await this.auth.currentUser;
  firebaseUser.getIdToken()
  .then((token) => {
    this.http.post(environment.baseUrl + 'index-documents', course, 
    {headers: { Authorization: 'Bearer ' + token }}).subscribe(data => {
      console.log(data);
    }, err => {
      // this.showError(err.message);
      console.log(err);
    })
  });
  
}

randomUp(number: number): number{
  return Math.ceil(Math.floor(number));
}



showError(message:string): void{
  this.showError(message);
}

async deleteCourse(docId: string) {
  try{
    this.isLoading = true;
    
    await this.firestore.collection('courses')
    .doc(docId).delete();
    this.isLoading = false;

  
  }catch(e){
    this.isLoading = false;
    console.log(e);
    this.showError('something went wrong');
  }
  }


async cancelUpload() {
  this.isErrorLoading = true;
  const user = localStorage.getItem('uploadId');
  await this.firestore.collection('courses')
  .doc(user).delete();
}


async clearImportantCredentials(){
   localStorage.removeItem('hasTitle');
   localStorage.removeItem('uploadCount');
   localStorage.removeItem('uploadId');
   localStorage.removeItem('course');
   localStorage.removeItem('question1');
   localStorage.removeItem('question1Filled');
   localStorage.removeItem('correctAnswerA');
   localStorage.removeItem('childId');
}

async cancelQuestion() {
  try{

    const user = localStorage.getItem('uploadId');
    await this.firestore.collection('courses')
    .doc(user).delete();
    this.isLoading = false;
    this.toast('Discarded course', 'warning');
    this.clearImportantCredentials();
   // this.router.navigate(['/dashboard']);
  
  }catch(e){
    this.showError('something went wrong');
  }
  }



get filledInquestion1(): boolean {
  const hasFilled = localStorage.getItem('question1Filled');
  return hasFilled == 'true';
}

 currentUrl(path: string): boolean{
  return this.router.url == path;
}

cancelCoursecreation():void { //back
  this.toast('Processing....', 'warning');
  this.cancelUpload().then(res => {
    this.isErrorLoading = false;
   this.clearImportantCredentials();
   this.toast('Cancelled creating course', 'info');
   this.router.navigate(['/dashboard']);
    }).catch((e) => {
      this.isErrorLoading = false;
      this.showError('Oops something went wrong');
    });
  }

toast(message:any , operation: any){ // strings
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
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

async navigate(count: any){
  console.log(count);
  this.router.navigate(['/notifications']);
  await this.firestore.collection<Student>('users').doc(this.userId).set({notificationCount: 0}, {merge: true});
  // if(count > 0){
  //   
  // }
  return true;
 
}

  

}
