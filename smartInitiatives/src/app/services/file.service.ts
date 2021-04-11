import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    /**
     * FormData is a data structure that can be used
     *  to store key-value pairs. We use it to build
     *  an object which corresponds to an HTML form 
     * with append() method.
     */

    formData.append('file', file);

    /**
     * We set reportProgress: true to exposes progress events.
     *  Notice that this progress event are expensive
     *  (change detection for each event),
     *  so you should only use when you want to monitor it.
     */
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }


  // getFiles(): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/files`);
  // }

}
