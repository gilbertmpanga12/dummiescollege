import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  checkUrl(url: string): boolean {
    return this.router.url == url;
  }

  startUpload(event: FileList): void {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') { 
      this.toastr.error('Whoops!', 'Upload images only', {
        timeOut: 4000,
        progressBar: true
      });
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

}
