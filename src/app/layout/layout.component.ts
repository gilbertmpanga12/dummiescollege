import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MainService } from '../services/main.service';
import { RouterOutlet, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Student } from '../services/models';
import { Observable } from 'rxjs';


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
    searchClient,
    // routing: true,
    insightsClient: (window as any).aa
  };

  @ViewChild('searchBox')  searchBox: ElementRef;

  
  resetSearchForm(path: String): void{
    const element: any = document.getElementsByClassName('ais-SearchBox-reset')[0];
    element.click();
    this.router.navigate(['/watch',path, 0]);
  }
  
  notification: AngularFirestoreDocument<Student>;
  notification$: Observable<Student>;
  constructor(public service: MainService,  public router: Router, private af: AngularFirestore, 
    private element: ElementRef, private renderer: Renderer2) { 
    
  }

  ngOnInit(): void {
    
    this.notification = this.af.collection<Student>('users').doc(this.service.userId);
    this.notification$ = this.notification.valueChanges();
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
