import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.scss']
})
export class CreatecourseComponent implements OnInit {
  
  constructor(public service: MainService, private router: Router) { }

  ngOnInit(): void {
  }
  checkUrl(url: string): boolean {
    return this.router.url == url;
  }

}
