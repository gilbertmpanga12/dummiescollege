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
   videoParamId: string;
   videoResults: any[] = [];
   initialPosition: number = 0;
   initialBackgroundColor: string = `
   flex rounded-sm px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 
   hover:bg-indigo-500 md:text-lg xl:text-base text-white 
   font-semibold leading-tight shadow-md ml-2 bg-default
   `;
   defaultBackgroundColor: string = `
   flex rounded-sm px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 
   hover:bg-indigo-500 md:text-lg xl:text-base text-white 
   font-semibold leading-tight shadow-md ml-2 bg-indigo-500
   `;
   title: any;
   initialVideo: any;
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
          this.title = this.videoResults[this.initialPosition]['videoTitle'];
          this.initialVideo =  this.videoResults[this.initialPosition]['videoUrl'];
          console.log(this.videoResults);
        })
        //this.videoResults.push
      })
    });
  }

  watchNextVideo(): void{
    if(this.initialPosition >= this.videoResults.length){
      return;
    }
    this.initialPosition++;
    console.log(this.initialPosition);
  }

}
