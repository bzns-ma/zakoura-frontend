import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    login (username: string, password: string){
        return this.http.post(environment.backendUrl.api +'login', {
            email: username,
            password: password
          }, httpOptions);
    }

    logout() {
        // remove user from local storage to log user out
        // window.location.reload();
    }


}