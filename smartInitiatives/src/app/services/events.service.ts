import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evnt } from '../models/Event_';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Evnt[]> {
    return this.httpClient.get<Evnt[]>(environment.backendUrl.api + environment.backendUrl.events);
  }

  getEventById(id : string){
    return this.httpClient.get<Evnt>(environment.backendUrl.api + environment.backendUrl.events +'/'+ id);
  }

  addEvent(event: Evnt){
    return this.httpClient.post<Evnt>(environment.backendUrl.api + environment.backendUrl.createEvent, event);
  }


  updateEvent(id: string, event: Evnt){
    let API_URL = `${environment.backendUrl.api}${environment.backendUrl.updateEvent}/${id}`;
    return this.httpClient.put<Evnt>(API_URL,event).pipe(
      catchError(this.handleError)
    );  }

  deleteEvent(id: string){
    let API_URL = `${environment.backendUrl.api}${environment.backendUrl.deleteEvent}/${id}`;
    return this.httpClient.delete<Evnt>(API_URL).pipe(
      catchError(this.handleError)
    );
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
