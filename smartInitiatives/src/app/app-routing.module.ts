import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ArtisanCvComponent } from './components/artisan-cv/artisan-cv.component';
import { LandingComponent } from './components/landing/landing.component';
import { ArtisansResolver } from './resolvers/artisans.resolver';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    relativeLinkResolution: 'legacy'
};

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LandingComponent },
  { 
    path: 'artisan', 
    component: ArtisanCvComponent,
    resolve:{
      artres : ArtisansResolver
    }
  }
  // { path: 'about', component: AboutComponent },
  // { path: 'portfolio', component: PortfolioComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'event', component: EventComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule],
  providers:[ArtisansResolver]
})
export class AppRoutingModule { }
