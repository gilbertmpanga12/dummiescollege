import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 canPlay: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  watch(): void{
    this.canPlay = true;
  }

}
