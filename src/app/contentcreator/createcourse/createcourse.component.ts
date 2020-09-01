import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.scss']
})
export class CreatecourseComponent implements OnInit {
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  constructor(public service: MainService, private router: Router, 
   private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
 

  startUpload(event: FileList): void {
    this.service.isLoading = true;
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'video') { 
      this.service.isLoading = false;
      this.service.showError('Upload images only');
      return;
    }
    const filePath = `courses/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.percentage = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        // this.percentage = null;
        this.downloadURL.subscribe(url => this.service.saveMediaUrl(url));
      } )
      
   )
  .subscribe();
 

  }

  cancelCoursecreation():void {
  this.service.cancelUpload().then(res => {
   localStorage.removeItem('hasTitle');
   localStorage.removeItem('uploadCount');
   localStorage.removeItem('uploadId');
   this.service.toast('Cancelled creating course', 'info');
   this.router.navigate(['/dashboard']);
    }).catch(err => {
      this.service.showError(err);
    });
  }

  doneCourseUpload(): void{
   localStorage.removeItem('hasTitle');
   localStorage.removeItem('uploadCount');
   localStorage.removeItem('uploadId');
   this.router.navigate(['/dashboard']);
   this.service.toast('Great! your has been successfully published', 'success');
  }

}
