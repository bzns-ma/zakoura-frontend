import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.backendUrl.api + environment.backendUrl.events);
  }

  addEvent(event: any){
    return this.httpClient.post<Event>(environment.backendUrl.api + environment.backendUrl.events + environment.backendUrl.createAchievement, event, { observe: 'response' });
  }

  updateEvent(id: string, event: any){
    return this.httpClient.post<Event>(environment.backendUrl.api + environment.backendUrl.events + environment.backendUrl.updateAchievement  + "?id=" + id, event, { observe: 'response' });
  }

  deleteEvent(id: string){
    return this.httpClient.post<Event>(environment.backendUrl.api + environment.backendUrl.events + environment.backendUrl.deleteAchievement + "?id=" + id, {}, { observe: 'response' });
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
