import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questionsGroup: FormGroup;
  markers: string[] = ['A', 'B', 'C', 'D'];
  constructor(public service: MainService, private _fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.questionsGroup = this._fb.group({
      question: ['', Validators.required],
      answers: new FormArray([new FormControl(), new FormControl(), new FormControl(), new FormControl()])
    });
    
  }
  get answers(){
    return this.questionsGroup.get('answers') as FormArray;
  }

  nextQuestion(): void{
    localStorage.setItem('question1Filled', 'true');
    localStorage.setItem('question1',JSON.stringify(this.questionsGroup));
  }

}
