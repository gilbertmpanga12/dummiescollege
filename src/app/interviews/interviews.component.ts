import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';


interface VideoParams{
  docId: string;
  index: number;
}

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
questions: any;
index: number;
docId: string;
fullCourse: any;
  constructor(public service: MainService, 
    private route: ActivatedRoute, 
    private router : Router, private af: AngularFirestore) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: VideoParams) => {
      this.index = param.index;
      this.docId = param.docId;
      this.loadQuestions(this.index);
    });
  }


  loadQuestions(index: number): void{
    let questions = JSON.parse(localStorage.getItem('currentCourse'));
    this.fullCourse = questions;
    this.questions = questions[index]['questions'][index];

   }


 async submitInterviewQuestion(question:string, answer: string){
   let countQuestions: any[] = this.questions;
   console.log(countQuestions, 'COUNT TOP')
   let testsSubmission = {
    questions: [{question, answer}],
    title: this.fullCourse[this.index]['courseTitle'],
    interviwerId: this.fullCourse[this.index]['interviwerId'],
    studentId: localStorage.getItem('userId'),
    docId: this.fullCourse[this.index]['docId'],
   };
   
  // let questionAnswers = JSON.parse(localStorage.getItem('fullInterview'));
  // let currentQuestions: any[] = questionAnswers['questions'];
  // currentQuestions.push({question, answer});
  // questionAnswers['questions'] = currentQuestions;
  localStorage.setItem('fullInterview', JSON.stringify(testsSubmission));
  let currentPosition:number = parseInt(localStorage.getItem('initialPosition'));
  currentPosition++;
 console.log(currentPosition >= this.fullCourse.length, 'Conditional circuity')
  if(currentPosition >= this.fullCourse.length){
    let totalRoutes = parseInt(localStorage.getItem('totalRoutes'));
    totalRoutes =- 1;
    if(totalRoutes < 0){
      // fire celebraions here
      Swal.fire(
        'Good job!',
        'You have completed the course. Check for your certficates on your profile',
        'success',

      ).then(() => {
        this.router.navigate(['/my-resume']);
        return;
      });
      return;
    }
    this.router.navigate(['/watch', this.docId, totalRoutes]);
    localStorage.setItem('totalRoutes', `${totalRoutes}`);
    return;
  }
  localStorage.setItem('initialPosition', `${currentPosition}`);
  this.router.navigate(['/interviews', this.docId, currentPosition]);
  console.log(currentPosition, 'curerent positon');
  this.service.submitInterviews(testsSubmission);

  
  }


}
