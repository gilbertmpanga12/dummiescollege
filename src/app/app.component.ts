import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'DummiesCollege';
 
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
