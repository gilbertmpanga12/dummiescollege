import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  questions: string[] = [
    'Making products that satifsy customers',
    'Earning revenue',
    'Manufacturing & selling goods & services'
  ];
  
 constructor(public service: MainService) { }

 ngOnInit(): void {
  
 }



 
}
