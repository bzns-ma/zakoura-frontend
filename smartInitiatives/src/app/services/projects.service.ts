import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getProject(): Observable<HttpResponse<Project[]>> {
    return this.httpClient.get<Project[]>(environment.backendUrl.api + environment.backendUrl.projects, { observe: 'response' });
  }

  addProject(project: any){
    return this.httpClient.post<Project>(environment.backendUrl.api + environment.backendUrl.projects + environment.backendUrl.createProject, { observe: 'response' });
  }

  updateProject(project: any){
    return this.httpClient.post<Project>(environment.backendUrl.api + environment.backendUrl.projects + environment.backendUrl.updateProject, project, { observe: 'response' });
  }

  deleteProject(project: any){
    return this.httpClient.post<Project>(environment.backendUrl.api + environment.backendUrl.projects + environment.backendUrl.deleteProject, project, { observe: 'response' });
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
