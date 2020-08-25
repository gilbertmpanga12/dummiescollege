import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-contentcreatordash',
  templateUrl: './contentcreatordash.component.html',
  styleUrls: ['./contentcreatordash.component.scss']
})
export class ContentcreatordashComponent implements OnInit {

  constructor(public service: MainService) { }

  ngOnInit(): void {
  }

  logout(): void{

  }

  showMenu(): void{
    
  }

}
