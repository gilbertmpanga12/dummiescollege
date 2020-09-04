import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Student } from 'src/app/services/models';
import { Observable } from 'rxjs';

const searchClient = algoliasearch(
  environment.algolia_app_id,
  environment.algolia_api_key
);

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
 defaultLinkStyle: string = `
 text-gray-800 
 font-bold py-2 px-4  hover:text-green-400 focus:text-green-600 inline-flex items-center outline-none 
   rounded-lg text-sm
 `;
 currentLinkStyle: string = `
 text-green-600 
 font-bold py-2 px-4  hover:text-green-400 focus:text-green-600 inline-flex items-center outline-none 
   rounded-lg text-sm
 `;

 config = {
  indexName: 'prod_DummiesCollege',
  searchClient
};
notification: AngularFirestoreDocument<Student>;
  notification$: Observable<Student>;

  constructor(public service: MainService,  public router: Router, private af: AngularFirestore) { 
    
  }

  resetSearchForm(path: String): void{
    const element: any = document.getElementsByClassName('ais-SearchBox-reset')[0];
    element.click();
    this.router.navigate(['/watch',path]);
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

 

}
