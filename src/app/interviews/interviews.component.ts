import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


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
    // console.log(questions);
    this.questions = questions[index]['questions'][index];
   }


 async submitInterviewQuestion(question:string, answer: string){
   let questions = JSON.parse(localStorage.getItem('currentCourse'));
   let countQuestions: any[] = this.questions;
   if(questions == null){
    localStorage.setItem('fullInterview',JSON.stringify({
      questions: [{question, answer}],
      title: questions['courseTitle'],
      interviwerId: questions['interviwerId'],
      studentId: localStorage.getItem('userId'),
      docId: questions['docId'],
     }));
     return;
   }
  let questionAnswers = JSON.parse(localStorage.getItem('fullInterview'));
  let currentQuestions: any[] = questionAnswers['questions'];
  currentQuestions.push({question, answer});
  questionAnswers['questions'] = currentQuestions;
  localStorage.setItem('fullInterview', JSON.stringify(questionAnswers));
  let currentPosition:number = parseInt(localStorage.getItem('initialPosition'));
  currentPosition++;
  if(currentPosition > countQuestions.length){
    currentPosition--;
    this.router.navigate(['/interviews', this.docId, countQuestions.length -1]);
  }
  localStorage.setItem('initialPosition', `currentPosition`);
  this.router.navigate(['/interviews', this.docId, currentPosition]);
  this.service.submitInterviews(questionAnswers);

  
  }


}
