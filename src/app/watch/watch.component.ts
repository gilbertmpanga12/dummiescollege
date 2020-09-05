import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


interface VideoParams{
  docId: string;
  index: number;
}

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
   videoParamId: string;
   videoResults: any[] = [];
   initialPosition: number;
   initialBackgroundColor: string = `
   flex rounded-sm px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 
   hover:bg-indigo-500 md:text-lg xl:text-base text-white 
   font-semibold leading-tight shadow-md ml-2 bg-default
   `;
   defaultBackgroundColor: string = `
   flex rounded-sm px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 
   md:text-lg xl:text-base text-white 
   font-semibold leading-tight shadow-md ml-2 bg-transparent border-green-600 
   text-gray-800
   `;
   title: any;
   initialVideo: any;
  constructor(public service: MainService, 
  private route: ActivatedRoute, 
  private af: AngularFirestore, private router : Router) { }

  ngOnInit(): void {
    // const tag = document.createElement('script');

    // tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
    this.route.params.subscribe((param: VideoParams) => {
      this.videoParamId = param.docId;
      this.initialPosition = param.index;
      this.af.collection('courses').doc(this.videoParamId)
      .collection('videos').get().subscribe(courses => {
        courses.docs.forEach(course => {
          this.videoResults.push(course.data());
          this.title = this.videoResults[this.initialPosition]['videoTitle'];
          this.initialVideo =  this.videoResults[this.initialPosition]['videoUrl'];
          console.log(this.videoResults);
        });
        //this.videoResults.push
      });
    });
  }

  watchNextVideo(): void{
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
      this.router.navigate(['/interviews',this.videoParamId, this.initialPosition]);
    }
    const currentPosition:number = parseInt(localStorage.getItem('initialPosition'));
    this.router.navigate(['/interviews',this.videoParamId, currentPosition]);

  }

}
