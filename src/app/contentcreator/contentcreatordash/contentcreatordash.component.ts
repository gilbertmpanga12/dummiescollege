import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contentcreatordash',
  templateUrl: './contentcreatordash.component.html',
  styleUrls: ['./contentcreatordash.component.scss']
})
export class ContentcreatordashComponent implements OnInit {

  constructor(public service: MainService, private router: Router) { }

  ngOnInit(): void {
  }

  
  checkUrl(url: string): boolean {
    return this.router.url == url;
  }
  

}
