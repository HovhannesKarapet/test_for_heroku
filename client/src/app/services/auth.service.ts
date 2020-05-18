import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {Logout} from "../ngxs/actions/auth.actions";
import {Router} from "@angular/router";
import {RemoveAll} from "../ngxs/actions/cart.actions";
import {RemoveAllOrders} from "../ngxs/actions/orders.action";
import {AuthModel} from "../models/auth.model";
import {log} from "util";
import {RemoveTables} from "../ngxs/actions/tables.action";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http  : HttpClient,
    private store : Store,
    private router: Router
  ) { }

  login(data): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${environment.API_URL}/auth/login`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  logoutFromGuest(data): Observable<string> {
    return this.http.post<any>(`${environment.API_URL}/auth/logout_with_password`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  logout(login) {
    this.store.dispatch(new Logout());
    this.store.dispatch(new RemoveAll());
    this.store.dispatch(new RemoveAllOrders());
    this.store.dispatch(new RemoveTables());
    return this.http.post<any>(`${environment.API_URL}/auth/logout_without_password`, {login: login})
      .pipe(
        tap(res => {
          this.router.navigate(['/']);
          return res;
        }),
        catchError(err => throwError(err))
      );
  }
}
