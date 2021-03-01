import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from '../models/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getActivities(): Observable<HttpResponse<Events[]>> {
    return this.httpClient.get<Events[]>(environment.backendUrl.api + environment.backendUrl.events, { observe: 'response' });
  }
}
