import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Student } from 'src/app/services/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contentcreatordash',
  templateUrl: './contentcreatordash.component.html',
  styleUrls: ['./contentcreatordash.component.scss']
})
export class ContentcreatordashComponent implements OnInit {
  metric$: Observable<Student>;
  metrics: AngularFirestoreDocument<Student>;
  constructor(public service: MainService, 
    private router: Router, private af: AngularFirestore) {
      this.metrics = this.af.doc<Student>('users/'+ this.service.userId);
      this.metric$ = this.metrics.valueChanges();
 }

  ngOnInit(): void {
    
  }

  
  checkUrl(url: string): boolean {
    return this.router.url == url;
  }
  

}
