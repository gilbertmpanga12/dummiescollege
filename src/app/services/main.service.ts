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
import { auth } from 'firebase/app';
import { firestore as ft } from 'firebase/app';


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
  hasWatched: boolean = false;
  spinner: boolean = false;
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
   this.resendEmailLink();
   await this.firestore.collection('users').doc(user.user.uid) // <Student>
   .set({
   email: payload.email,
   country: payload.country,
   fullName: payload.fullName,
   certificateCount: 0,
   profilePicture: payload.profilePicture,
   skillsCount: 0,
   courseCount: 0,
   notificationCount: 0,
   views: 0
   });
   this.router.navigate(['/']);
  }

  async googleSign(){
    const googleProvider =  new auth.GoogleAuthProvider();
     await this.auth.signInWithRedirect(googleProvider);
     const lastUrl = localStorage.getItem('lastUrl');
     if(lastUrl != null){
       this.router.navigate(['/' + lastUrl]);
       localStorage.removeItem('lastUrl');
       return;
     }
     this.router.navigate(['/']);
  }

  async userSignedIn() {
    await this.auth.currentUser;
  }

  async forgotPassword(email: string){
    await this.auth.sendPasswordResetEmail(email);
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
  localStorage.setItem('coursePayload', JSON.stringify({title: payload.title, 
    caption: payload.caption, uid: user.uid, docId: randomId, 
    grade: 0, size: 0}));
   this.isLoading = false;
   localStorage.setItem('hasTitle', 'true');
   localStorage.setItem('uploadCount', '0');
   localStorage.setItem('uploadId', randomId);
   
  }catch(e){
    this.toast('Oops something went wrong', 'error');
  }
 }

 async submitInterviews(payload: any){
  console.log(payload)
   try{
    let user = this.userId;
    this.firestore.collection('courses').doc(payload['docId']).collection('scoreboard').add({
      ...payload
    });
    this.toast('Submitted!', 'info');
   }catch(e){
    this.toast('Something went wrong', 'error');
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


async updateCourseCount(){
  const increment = ft.FieldValue.increment(1)
  this.firestore.doc('users/'+ this.userId).set({courseCount: increment}, {merge: true});
}

async deleteCourseCount(){
  const decrement =ft.FieldValue.increment(-1)
  this.firestore.doc('users/'+ this.userId).set({courseCount:  decrement}, {merge: true});
}


async saveMediaUrl(path: string, videoTitle: string){
  
  try{
    localStorage.setItem('videoPayload', JSON.stringify({
      videoUrl: path,
      videoTitle: videoTitle
    }));
    
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

async saveQuestions(payload: any, correctAnswerA: string, correctAnswerB){
  try{
    this.isLoading = true;
    let coursePayload = JSON.parse(localStorage.getItem('coursePayload'));
    let videoPayload =  JSON.parse(localStorage.getItem('videoPayload'));
    let uploadCount = this.uploadsCount + 1;
    const randomId = `${Math.ceil(Math.random() * 100000000000)}`; 
    
    if(uploadCount == 15){
       this.seedDocument(); // payload data 
    }

    videoPayload['correctAnswerA'] = correctAnswerA;
    videoPayload['correctAnswerB'] = correctAnswerB;
    videoPayload['questions'] = payload;
    coursePayload['size'] += 1;
    videoPayload['docId'] = this.uploadId;
    videoPayload['secondayId'] = randomId;
    videoPayload['created_at'] = Date.now();
    videoPayload['interviwerId'] = this.userId;
    videoPayload['courseTitle'] = coursePayload['title'];

    

    await this.firestore.collection('courses').doc(this.uploadId).set({
      ...coursePayload
    });

    await this.firestore.collection('courses').doc(this.uploadId).collection('videos')
    .doc(randomId).set({
      ...videoPayload
    });

    this.isLoading = false;
    localStorage.setItem('uploadCount', `${uploadCount}`);
    this.router.navigate(['/createcourse']);
    this.toast('Questions set successfully', 'info');
    localStorage.removeItem('question1Filled');
    
    
  }catch(e){
    this.showError('something went wrong');
    this.isLoading = false;
  }
}

async deleteAlgoliaIndex(index: string){
  const firebaseUser = await this.auth.currentUser;
  firebaseUser.getIdToken()
  .then((token) => {
    this.http.get(environment.baseUrl + 'delete-index/' + index, 
    {headers: { Authorization: 'Bearer ' + token }}).subscribe(data => {
      this.deleteCourseCount();
    }, err => {
      // this.showError(err.message);
      console.log(err);
    });
  });
}

async seedDocument(){
  
  const course = JSON.parse(localStorage.getItem('coursePayload'));
  course['objectID'] = this.userId;
  const firebaseUser = await this.auth.currentUser;
  firebaseUser.getIdToken()
  .then((token) => {
    this.http.post(environment.baseUrl + 'index-documents', course, 
    {headers: { Authorization: 'Bearer ' + token }}).subscribe(data => {
      this.updateCourseCount();
      this.clearImportantCredentials();
    }, err => {
      // this.showError(err.message);
      console.log(err);
    });
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
    this.deleteAlgoliaIndex(docId);
   
  
  }catch(e){
    this.isLoading = false;
    console.log(e);
    this.showError('something went wrong');
  }
  }





async clearImportantCredentials(){
   localStorage.removeItem('hasTitle');
   localStorage.removeItem('uploadCount');
   localStorage.removeItem('uploadId');
   localStorage.removeItem('coursePayload');
   localStorage.removeItem('question1');
   localStorage.removeItem('question1Filled');
   localStorage.removeItem('correctAnswerA');
   localStorage.removeItem('videoPayload');
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

get uploadId(): string{
  return  localStorage.getItem('uploadId');
}

 currentUrl(path: string): boolean{
  return this.router.url == path;
}

cancelCourse(){
  this.router.navigate(['/dashboard']);
  this.toast('Course discarded', 'warning');
  this.clearImportantCredentials();
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

async launchDemo(){
  Swal.fire({
    title: 'All answers are correct! Signup and get to learn more',
    width: 600,
    padding: '3em',
    background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `
  }).then(result => {
this.router.navigate(['/auth','register']);
  });
}

watchNextVideo(videoParamId: string, initialPosition:number): void{
  // if(this.initialPosition >= this.videoResults.length){
  //   return;
  // }
  // this.initialPosition++;
  // localStorage.setItem('initialPosition', `${this.initialPosition}`);
  // localStorage.setItem('currentCourse', JSON.stringify(this.videoResults));
  // this.router.navigate(['/interviews',this.videoParamId,this.initialPosition]);
  // console.log(this.initialPosition);
  if(localStorage.getItem('initialPosition') == null){
    localStorage.setItem('initialPosition', `0`);
    this.router.navigate(['/interviews',videoParamId, initialPosition]);
  }
  const currentPosition:number = parseInt(localStorage.getItem('initialPosition'));
  this.router.navigate(['/interviews',videoParamId, currentPosition]);

}

  

}
