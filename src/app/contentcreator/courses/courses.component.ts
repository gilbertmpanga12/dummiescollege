import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'src/app/services/models';
import { MainService } from 'src/app/services/main.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allcourse$: Observable<Course[]>;
  constructor(private af: AngularFirestore, private service: MainService) { 
    this.allcourse$ = this.af.collection<Course>('courses', 
    ref => ref.where('uid','==', service.userId)).valueChanges();
  }

  ngOnInit(): void {
  }

}
