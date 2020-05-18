import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {UserModel} from "../models/user.model";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(role_id): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.API_URL}/users/${role_id}`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  getGuests(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/users/guests/tables`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  createUser(role_id, data): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.API_URL}/users/${role_id}`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  updateUser(user_id, data): Observable<UserModel> {
    return this.http.put<UserModel>(`${environment.API_URL}/users/${user_id}`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  removeUser(user_id) {
    return this.http.delete(`${environment.API_URL}/users/${user_id}`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  reserve(user_id, data): Observable<any> {
    return this.http.put(`${environment.API_URL}/users/reserve/${user_id}`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }
}
