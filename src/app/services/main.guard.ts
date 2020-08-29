import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AngularFireAuth){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.authState
      .pipe(take(1),map(user => {
        return !!user;
      }), tap(loggedIn => {
        if (!loggedIn) {
          localStorage.setItem('lastUrl', `${next.url[0].path}`);
          this.router.navigate(['/auth']);
        }
    }));
  }
  
}
