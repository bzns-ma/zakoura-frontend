import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArtisanCvComponent } from './artisan-cv/artisan-cv.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LandingComponent },
  { path: 'artisan', component: ArtisanCvComponent },
  { path: 'about', component: AboutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
