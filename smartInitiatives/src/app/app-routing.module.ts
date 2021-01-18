import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ArtisanCvComponent } from './components/artisan-cv/artisan-cv.component';
import { ContactComponent } from './components/contact/contact.component';
import { LandingComponent } from './components/landing/landing.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    relativeLinkResolution: 'legacy'
};

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LandingComponent }
  // { path: 'artisan', component: ArtisanCvComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'portfolio', component: PortfolioComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'event', component: EventComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
