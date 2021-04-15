import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

import { Artisan } from '../models/artisan';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  constructor(private httpClient: HttpClient) { }

  getArtisans(): Observable<Artisan[]> {
    return this.httpClient.get<Artisan[]>(environment.backendUrl.api + environment.backendUrl.artisan);
  }

  getArtisan(id : string): Observable<Artisan> {
    return this.httpClient.get<Artisan>(environment.backendUrl.api + environment.backendUrl.artisan +'/'+ id);
  }

  addArtisan(artisan: Artisan){
    return this.httpClient.post<Artisan>(environment.backendUrl.api + environment.backendUrl.createArtisan,artisan);
  }

  updateArtisan(id: string, artisan: any){
    return this.httpClient.put<Artisan>(environment.backendUrl.api + environment.backendUrl.updateArtisan+ "/" + id, artisan)
    .pipe(catchError(this.handleError));
  }

  deleteArtisan(id: string){
    let API_URL = `${environment.backendUrl.api}delete_artisan/${id}`;
    return this.httpClient.delete<Artisan>(API_URL).pipe(
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
