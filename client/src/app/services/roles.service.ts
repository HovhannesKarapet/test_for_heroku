import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {RoleModel} from "../models/role.model";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient
  ) { }

  getRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${environment.API_URL}/roles/`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }
}
