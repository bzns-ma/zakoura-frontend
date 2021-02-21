import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Achievement } from '../models/achievement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchivementsService {

  constructor(private httpClient: HttpClient) { }

  getAchivements(): Observable<HttpResponse<Achievement[]>> {
    return this.httpClient.get<Achievement[]>(environment.backendUrl.api + environment.backendUrl.achievement, { observe: 'response' });
  }

  addAchievement(achievement: any){
    return this.httpClient.post<Achievement>(environment.backendUrl.api + environment.backendUrl.projects + environment.backendUrl.createAchievement, achievement, { observe: 'response' });
  }

  updateAchievement(achievement: any){
    return this.httpClient.post<Achievement>(environment.backendUrl.api + environment.backendUrl.projects + environment.backendUrl.updateAchievement, achievement, { observe: 'response' });
  }

  deleteAchievement(achievement: any){
    return this.httpClient.post<Achievement>(environment.backendUrl.api + environment.backendUrl.projects + environment.backendUrl.deleteAchievement, achievement, { observe: 'response' });
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
