import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import {  ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


interface VideoParams{
  docId: string;
}

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  test: string[] = ["Chapter 1", "Chapter 2", 
  "Chapter 3", "Chapter 4",
  "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10"];
   videoParamId: string;
   videoResults: any[] = [];
  constructor(public service: MainService, private route: ActivatedRoute, private af: AngularFirestore) { }

  ngOnInit(): void {
    // const tag = document.createElement('script');

    // tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
    this.route.params.subscribe((param: VideoParams) => {
      this.videoParamId = param.docId;
      this.af.collection('courses').doc(this.videoParamId)
      .collection('videos').get().subscribe(courses => {
        courses.docs.forEach(course => {
          this.videoResults.push(course.data());
          console.log(this.videoResults);
        })
        //this.videoResults.push
      })
    });
  }

}
