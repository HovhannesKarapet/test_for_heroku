import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {CategoryItemModel} from "../models/category-item.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  search(search): Observable<CategoryItemModel[]> {
    return this.http.post<CategoryItemModel[]>(`${environment.API_URL}/search`, {search})
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }
}
