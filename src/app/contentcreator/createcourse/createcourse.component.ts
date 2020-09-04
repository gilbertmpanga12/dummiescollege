import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
  @ViewChild('uploadform') uploadform: ElementRef;
  videoTitle: string;
  constructor(public service: MainService, private router: Router, 
   private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
 

  askVideoTitle(){
    
    Swal.fire({
      title: 'Title for this video',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Upload',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.videoTitle = login;
        if(this.videoTitle.length < 1){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Title can\'t  be left blank"
          })
          return null;
        }

        this.uploadform.nativeElement.click();
      }
    });
   
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
        this.downloadURL.subscribe(url => this.service.saveMediaUrl(url, this.videoTitle));
      } )
      
   )
  .subscribe();
 

  }

  

  doneCourseUpload(): void{
   localStorage.removeItem('hasTitle');
   localStorage.removeItem('uploadCount');
   localStorage.removeItem('uploadId');
   localStorage.removeItem('question1');
   this.router.navigate(['/dashboard']);
   this.service.toast('Great! your has been successfully published', 'success');
   this.service.seedDocument(); // index documents
  }

}
