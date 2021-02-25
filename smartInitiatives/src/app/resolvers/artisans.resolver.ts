import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArtisanService } from '../services/artisan.service';


@Injectable()
export class ArtisansResolver implements Resolve<any> {
  constructor(private api: ArtisanService) {}

  resolve(route : ActivatedRouteSnapshot,rstate : RouterStateSnapshot) : any{
    // console.log('logging collected route param',route.params['artres']);
    return this.api.getArtisans().pipe(
      map(data => ({dataState : "Loaded",data:data})),
    catchError(error =>of({dataState:"Error",errorMessage :error.message}))
    );

  }
}