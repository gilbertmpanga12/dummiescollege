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
  constructor(public service: MainService, private _fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.questionsGroup2 = this._fb.group({
      question2: ['', Validators.required],
      answers2: new FormArray([new FormControl(), new FormControl(), new FormControl(), new FormControl()])
    });
    
  }
  get answers1(){
    return this.questionsGroup2.get('answers1') as FormArray;
  }

  log(){
    console.log(this.questionsGroup2.getRawValue())
  }
}
