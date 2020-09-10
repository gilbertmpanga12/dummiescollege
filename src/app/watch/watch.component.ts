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
     md:text-lg xl:text-base text-white 
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
   totalRoutes: number = 0;
   mainTitle: string;
  constructor(public service: MainService, 
  private route: ActivatedRoute, 
  private af: AngularFirestore, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: VideoParams) => {
      this.videoParamId = param.docId;
      this.initialPosition = param.index;
      this.af.collection('courses').doc(this.videoParamId)
      .collection('videos').get().subscribe(courses => {
        
      let results = new Promise((reject, resolve) => {
        
        courses.docs.forEach((value, index, array) => {
          this.totalRoutes++;

          this.videoResults.push(array[index].data());
         
          if(index == array.length - 1) resolve(this.videoResults);
        });
      });
       results.then((e) => {
         
        console.log('yopppp')
    
       }).catch(e => {
        // console.log(e, 'HED HONCHO');
            this.title = e[this.initialPosition]['videoTitle'];
    this.mainTitle = e[this.initialPosition]['courseTitle'];
    this.initialVideo =  e[this.initialPosition]['videoUrl'];
    localStorage.setItem('currentCourse', JSON.stringify(e));
    localStorage.setItem('totalRoutes', `${e.length}`);
       });
        
        //this.videoResults.push
      });
    });


    
  }



 

}
