import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Achivement } from '../models/achivement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchivementsService {

  constructor(private httpClient: HttpClient) { }

  getAchivements(): Observable<HttpResponse<Achivement[]>> {
    return this.httpClient.get<Achivement[]>(environment.backendUrl.api + environment.backendUrl.achivements, { observe: 'response' });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
