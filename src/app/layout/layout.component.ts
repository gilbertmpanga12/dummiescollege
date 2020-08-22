import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  constructor(public service: MainService, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
  }

  
  
  showMenu(){
    this.service.showMobileMenu = true;
    console.log(this.service.showMobileMenu);
  }

  logout(): void{
    this.service.showMobileMenu = false;
    this.service.logout();
    this.toastr.info('You\'ve been signed out','');
  }

}
