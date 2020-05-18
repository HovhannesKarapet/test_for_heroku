import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {AuthState} from "../ngxs/states/auth.state";
import {AuthService} from "./auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private store       : Store,
    private router      : Router,
    private authService : AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = new JwtHelperService();

    if(!this.store.selectSnapshot(AuthState.token)) {
      this.router.navigate(['/'])
    } else if(jwt.isTokenExpired(this.store.selectSnapshot(AuthState.token))) {
      this.authService.logout(this.store.selectSnapshot(AuthState.login)).subscribe();
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.store.selectSnapshot(AuthState.token)}`
      }
    });

    return next.handle(req);
  }
}
