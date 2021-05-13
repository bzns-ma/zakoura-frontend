import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { TokenStorageService } from '../services/token-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = request;
        const currentUser = this.token.getUser();
        // const token = this.token.getToken();
        if (currentUser && currentUser.accessToken) {
            authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY,  currentUser.accessToken) });
        }

        return next.handle(authReq).pipe(catchError(err =>{
            console.log('err.status>',err,err.status);
            return throwError(err);
        }))
    //     return next.handle(authReq).pipe( tap(() => {},
    //   (err: any) => {
    //   if (err instanceof HttpErrorResponse) {
    //     if (err.status !== 401) {
    //      return;
    //     }
    //     this.router.navigate(['login']);
    //   }
    // }));
        // return next.handle(authReq)
        // .pipe(catchError(err => {
        //     console.log('error interceptor',err.status);
            
        //     // if ([401, 403].includes(err.status)) {
        //     //     this.token.signOut();
        //     //     this.router.navigate(['/login']);
                
        //     // };
        //     return throwError(err);
        // }));
}
}