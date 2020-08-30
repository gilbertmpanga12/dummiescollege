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
      question1: ['', Validators.required],
      answers1: new FormArray([new FormControl(), new FormControl(), new FormControl(), new FormControl()])
    });
    
  }
  get answers1(){
    return this.questionsGroup.get('answers1') as FormArray;
  }

  log(){
    console.log(this.questionsGroup.getRawValue())
  }

}
