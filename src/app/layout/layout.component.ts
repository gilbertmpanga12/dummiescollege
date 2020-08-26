import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


const slideInAnimation = trigger('routeAnimations', [ 
  transition('HomePage <=> ResumePage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),transition('* <=> ResumePage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  
  transition('* <=> NotificationsPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]), 
  transition('* <=> WatchPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  
]);

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [slideInAnimation]
})
export class LayoutComponent implements OnInit {
  
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

  navigate(): void{
    console.log('called')
    this.router.navigate(['/']);
  }
}
