import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {LoggedInUser} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getAuth().pipe(
        map((user: LoggedInUser) => true),
        catchError((error: Error) => {
          console.error(error.message);
          this.router.navigate(['']);
          return of(false);
        })
    );
  }
}
