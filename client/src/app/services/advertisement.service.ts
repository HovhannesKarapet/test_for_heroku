import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {AdvertisementModel} from "../models/advertisement.model";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient) { }

  getAllAdvertisements(): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(`${environment.API_URL}/advertisement`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  getAdvertisement(size): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(`${environment.API_URL}/advertisement/${size}`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  addAdvertisement(data): Observable<any> {
    return this.http.post(`${environment.API_URL}/advertisement/`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }

  removeAdvertisement(id): Observable<any> {
    return this.http.delete(`${environment.API_URL}/advertisement/${id}`)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }
}
