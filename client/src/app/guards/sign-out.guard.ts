import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from "@ngxs/store";
import {AuthState} from "../ngxs/states/auth.state";

@Injectable({
  providedIn: 'root'
})
export class SignOutGuard implements CanActivate {

  constructor(
    private store   : Store,
    private router  : Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.store.selectSnapshot(AuthState.signOut)) return true;
    else this.router.navigate(['/home/sign_out']);
  }

}
