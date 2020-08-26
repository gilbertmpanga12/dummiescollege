import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.scss']
})
export class BottomnavComponent implements OnInit {

  constructor(public service: MainService, private router: Router) { }

  ngOnInit(): void {
  }

  
  checkUrl(url: string): boolean {
    return this.router.url == url;
  }


}
