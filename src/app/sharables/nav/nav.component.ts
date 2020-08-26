import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterOutlet } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public service: MainService, private toastr: ToastrService, public router: Router) { 
    
  }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
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

  navigate(url: string): void{
    console.log('am clicked');
    this.router.navigate([url]);

  }

}
