import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-questionpart2',
  templateUrl: './questionpart2.component.html',
  styleUrls: ['./questionpart2.component.scss']
})
export class Questionpart2Component implements OnInit {
  questionsGroup2: FormGroup;
  markers: string[] = ['A', 'B', 'C', 'D'];
  payload: any[] = [];
  constructor(public service: MainService, private _fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.questionsGroup2 = this._fb.group({
      question: ['', Validators.required],
      answers: new FormArray([new FormControl(), new FormControl(), new FormControl(), new FormControl()]),
      correctAnswer: ['', Validators.required]
    });
    
  }
  get answers(){
    return this.questionsGroup2.get('answers') as FormArray;
  }

  submitQuestions(){
    const correctAnswerA = localStorage.getItem('correctAnswerA');
    const correctAnswerB = this.answers.controls[parseInt(this.questionsGroup2.get('correctAnswer').value)];
    const findQuestion1 = localStorage.getItem('question1');
    const question1 = JSON.parse(findQuestion1);
    const question2 = this.questionsGroup2.getRawValue();
    this.payload.push(question1,question2);
    this.service.saveQuestions(this.payload, correctAnswerA, correctAnswerB);
  }
}
