import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finishup',
  templateUrl: './finishup.component.html',
  styleUrls: ['./finishup.component.scss']
})
export class FinishupComponent implements OnInit {

  constructor(private service: MainService, private router: Router) { }

  ngOnInit(): void {
  }

  finishUp(): void{
    this.router.navigate(['/dashboard']);
    this.service.toast('Your course was published successfully', 'success');
    this.service.clearImportantCredentials();
  }

}
