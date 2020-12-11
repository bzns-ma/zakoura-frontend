import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArtisanCvComponent } from './artisan-cv/artisan-cv.component';
import { ContactComponent } from './contact/contact.component';
import { EventComponent } from './event/event.component';
import { LandingComponent } from './landing/landing.component';
import { PagesJaunesComponent } from './pages-jaunes/pages-jaunes.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LandingComponent },
  { path: 'artisan', component: PagesJaunesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'event', component: EventComponent },
  { path: 'contact', component: ContactComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
