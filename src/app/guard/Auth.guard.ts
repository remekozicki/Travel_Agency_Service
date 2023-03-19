import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth.service';
import { TripsService } from '../services/Trips.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( public authService: AuthService,
    public router: Router,
    private tripService: TripsService){}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): 
    |Observable<boolean | UrlTree >
    | Promise <boolean | UrlTree> 
    | boolean
    |UrlTree{

    return this.authService.getAuthenticated().pipe(
      map((state) =>{
        if(state == null){
          this.router.navigate(['']);
          return false;
        }

        this.authService.userData = state;
        return true;
      })
    );
  }
  
}
