import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from "@ngxs/store";
import {AuthState} from "../ngxs/states/auth.state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store       : Store,
    private router      : Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.store.selectSnapshot(AuthState.isAuthenticated)) return true;
    else if(this.store.selectSnapshot(AuthState.isClient)) this.router.navigate(['/home']);
    else if(this.store.selectSnapshot(AuthState.isAdmin)) this.router.navigate(['/admin']);
    else if(this.store.selectSnapshot(AuthState.isEmployee)) this.router.navigate(['/back_office']);
  }

  // canLogout(next: ActivatedRouteSnapshot,
  //           state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if(this)
  // }

}
