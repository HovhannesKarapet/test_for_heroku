import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {
  }

  rate(data): Observable<any> {
    return this.http.post(`${environment.API_URL}/rate`, data)
      .pipe(
        tap(res => res),
        catchError(err => throwError(err))
      );
  }
}
