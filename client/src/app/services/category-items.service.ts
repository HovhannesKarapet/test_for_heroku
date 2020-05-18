import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {CategoryModel} from "../models/category.model";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {CategoryItemModel} from "../models/category-item.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryItemsService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoryItems(category_id): Observable<CategoryItemModel[]> {
    return this.http.get<CategoryItemModel[]>(`${environment.API_URL}/category_items/category/${category_id}`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  getBestSellers(): Observable<CategoryItemModel[]> {
    return this.http.get<CategoryItemModel[]>(`${environment.API_URL}/category_items/best_sellers`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  createCategoryItem(category_id, data): Observable<CategoryItemModel> {
    return this.http.post<CategoryItemModel>(`${environment.API_URL}/category_items/${category_id}`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  updateCategoryItem(category_item_id, data): Observable<CategoryItemModel> {
    return this.http.put<CategoryItemModel>(`${environment.API_URL}/category_items/${category_item_id}`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  removeCategoryItem(category_item_id) {
    return this.http.delete(`${environment.API_URL}/category_items/${category_item_id}`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

}
