import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

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
        
      let results = new Promise((resolve, reject) => {
        
        courses.docs.forEach((value, index, array) => {
       
          this.videoResults.push(array[index].data());
         
          if(index == array.length - 1) resolve(this.videoResults);
        });
      });
       results.then((e:any) => {
    this.title = e[this.initialPosition]['videoTitle'];
    this.mainTitle = e[this.initialPosition]['courseTitle'];
    this.initialVideo =  e[this.initialPosition]['videoUrl'];
    localStorage.setItem('currentCourse', JSON.stringify(e));
    localStorage.setItem('totalRoutes', `${e.length}`);
    
       }).catch(e => {
       this.toast('Check your internet connection', 'error', 5000);
            
       });
        
        //this.videoResults.push
      });
    });


    
  }

  toast(message:string , operation: any, error:number){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: error,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    
    Toast.fire({
      icon: operation,
      title: message
    });
  }

 

}
