import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArtisanCvComponent } from './artisan-cv/artisan-cv.component';
import { ContactComponent } from './contact/contact.component';
import { EventComponent } from './event/event.component';
import { LandingComponent } from './landing/landing.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
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
