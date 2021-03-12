import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

import { Artisan } from '../models/artisan';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  constructor(private httpClient: HttpClient) { }

  getArtisans(): Observable<Artisan[]> {
    return this.httpClient.get<Artisan[]>(environment.backendUrl.api + environment.backendUrl.artisan);
  }

  addArtisan(artisan: any){
    return this.httpClient.post<Artisan>(environment.backendUrl.api + environment.backendUrl.artisan + environment.backendUrl.createArtisan, { observe: 'response' });
  }

  updateArtisan(id: string, artisan: any){
    return this.httpClient.post<Artisan>(environment.backendUrl.api + environment.backendUrl.artisan + environment.backendUrl.updateArtisan + "?id=" + id, artisan, { observe: 'response' });
  }

  deleteArtisan(id: string){
    return this.httpClient.post<Artisan>(environment.backendUrl.api + environment.backendUrl.artisan + environment.backendUrl.deleteArtisan + "?id=" + id, {}, { observe: 'response' });
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
