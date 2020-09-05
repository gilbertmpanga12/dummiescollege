import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(public service: MainService, 
    private route: ActivatedRoute, 
    private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: VideoParams) => {
      this.index = param.index;
      this.loadQuestions(this.index);
    });
  }


  loadQuestions(index: number): void{
    let questions = JSON.parse(localStorage.getItem('currentCourse'));
    this.questions = questions[index]['questions'][index];
    console.log(this.questions);
  }

}
