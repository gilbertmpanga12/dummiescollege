import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

const slideInAnimation = trigger('routeAnimations', [ 
  transition('LoginPage <=> RegisterPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]) ,
  transition('* <=> LoginPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  transition('* <=> RegisterPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]), 
  transition('* <=> ForgotpasswordPage', [
    style({ opacity: 0 }), 
    animate(300, style({opacity: 1})),
  ]),
  
]);

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [ slideInAnimation]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
