import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {CategoryModel} from "../models/category.model";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${environment.API_URL}/categories`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  getCategoryNames(): Observable<any> {
    return this.http.get(`${environment.API_URL}/categories/names`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  createCategory(data): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${environment.API_URL}/categories`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  updateCategory(category_id, data): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${environment.API_URL}/categories/${category_id}`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  removeCategories(category_id) {
    return this.http.delete(`${environment.API_URL}/categories/${category_id}`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }
}
