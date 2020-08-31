import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'src/app/services/models';
import { MainService } from 'src/app/services/main.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allcourse$: Observable<Course[]>;
  constructor(private af: AngularFirestore, public service: MainService) { 
    this.allcourse$ = this.af.collection<Course>('courses', 
    ref => ref.where('uid','==', service.userId)).valueChanges();
  }

  ngOnInit(): void {
  }

  deleteCourse(docId: string): void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.deleteCourse(docId).then(resp => {
          Swal.fire(
            'Deleted!',
            'Your course has been deleted.',
            'success'
          );
        }).catch(() => {
          Swal.fire(
            'Whoops!',
            'Something went wrong. Try again',
            'error'
          );
        });
        
      }
    })
  
  }

}
