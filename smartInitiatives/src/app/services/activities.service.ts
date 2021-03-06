import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Activity } from '../models/activity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private httpClient: HttpClient) { }

  getActivities(): Observable<HttpResponse<Activity[]>> {
    return this.httpClient.get<Activity[]>(environment.backendUrl.activities, { observe: 'response' });
  }

  
  // addActivity(activity: any){
  //   return this.httpClient.post<any>(environment.backendUrl.api + environment.backendUrl.activities + environment.backendUrl.createActivity, { observe: 'response' });
  // }

  // updateActivity(activity: any){
  //   return this.httpClient.post<Activity>(environment.backendUrl.api + environment.backendUrl.activities + environment.backendUrl.updateActivity, activity, { observe: 'response' });
  // }

  // deleteActivity(activity: any){
  //   return this.httpClient.post<Activity>(environment.backendUrl.api + environment.backendUrl.activities + environment.backendUrl.deleteActivity, activity, { observe: 'response' });
  // }

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
