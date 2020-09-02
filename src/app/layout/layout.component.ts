import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { RouterOutlet, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';


const searchClient = algoliasearch(
  environment.algolia_app_id,
  environment.algolia_api_key
);


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
  defaultLinkStyle: string = `text-sm 
  text-gray-800 font-bold py-2 px-4  hover:text-green-400 focus:text-green-800 inline-flex items-center outline-none mr-2
   `;
  currentLinkStyle = `text-sm 
  text-gray-800 font-bold py-2 px-4  hover:text-green-400 focus:text-green-800 inline-flex items-center outline-none mr-2
  `;
  config = {
    indexName: 'prod_DummiesCollege',
    searchClient
  };
  constructor(public service: MainService,  public router: Router) { 
    
  }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  
  showMenu(){
    this.service.showMobileMenu = true;
  }

  logout(): void{
    this.service.showMobileMenu = false;
    this.service.logout();
    this.service.toast('You\'ve been signed out', 'info');
  }

  

  checkUrl(url: string): boolean {
    return this.router.url == url;
  }
}
