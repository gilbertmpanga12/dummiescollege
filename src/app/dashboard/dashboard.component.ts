import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Skills, Certificates, Student } from '../services/models';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  $skills: Observable<Skills[]>;
  $certificates: Observable<Certificates[]>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  userDetails: AngularFirestoreDocument<Student>;
  userDetail$: Observable<Student>;
  constructor(public service: MainService,  private toastr: ToastrService, 
    private af:  AngularFirestore, private storage: AngularFireStorage, private router: Router) { 
    this.userDetails = this.af.doc<Student>('users' + '/' + service.userId);
    this.userDetail$ = this.userDetails.valueChanges();
    this.$skills = this.af.collection('users')
    .doc(service.userId).collection<Skills>('skills').valueChanges();
    this.$certificates = this.af.collection('users').doc(service.userId)
    .collection<Certificates>('certificates').valueChanges();
  }

  ngOnInit(): void {
  }

  logout(): void{
    this.service.showMobileMenu = false;
    this.service.logout();
    this.toastr.info('You\'ve been signed out','');
    this.router.navigate(['/']);
  }

  startUpload(event: FileList): void{
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') { 
      this.toastr.error('Whoops!', 'Upload images only', {
        timeOut: 4000,
        progressBar: true
      });
      return;
    }
    const filePath = `profiles/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.percentage = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        // this.percentage = null;
        this.downloadURL.subscribe(url => this.service.updateUserProfilePicture(url));
      } )
      
   )
  .subscribe();

  }

  

}
