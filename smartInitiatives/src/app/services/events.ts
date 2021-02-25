import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Event } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getAchivements(): Observable<HttpResponse<Event[]>> {
    return this.httpClient.get<Event[]>(environment.backendUrl.api + environment.backendUrl.achievement, { observe: 'response' });
  }

  addAchievement(event: any){
    return this.httpClient.post<Event>(environment.backendUrl.api + environment.backendUrl.events + environment.backendUrl.createAchievement, event, { observe: 'response' });
  }

  updateAchievement(event: any){
    return this.httpClient.post<Event>(environment.backendUrl.api + environment.backendUrl.events + environment.backendUrl.updateAchievement, event, { observe: 'response' });
  }

  deleteAchievement(event: any){
    return this.httpClient.post<Event>(environment.backendUrl.api + environment.backendUrl.events + environment.backendUrl.deleteAchievement, event, { observe: 'response' });
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
