import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ArtisanCvComponent } from './components/artisan-cv/artisan-cv.component';
import { LandingComponent } from './components/landing/landing.component';
import { ArtisansResolver } from './resolvers/artisans.resolver';
import { LoginComponent } from './components/admin/login/login.component';
// import { IndexComponent } from './components/admin/index/index.component';
import { AuthGuard } from './helpers/auth.guard';
import { AdministrationComponent } from './components/administration/administration.component';
import { ArtisanAddComponent } from './components/artisan-add/artisan-add.component';
import { ArtisanEditComponent } from './components/artisan-edit/artisan-edit.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  relativeLinkResolution: 'legacy'
};

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', component: NotFoundComponent },
  {
    path: 'artisan',
    component: ArtisanCvComponent,
    resolve: {
      artres: ArtisansResolver
    }
  }
  ,
  {
    path: 'eventDetail/:id', component: EventDetailsComponent
  }
  ,
  // { path: 'admin', component: IndexComponent, canActivate: [AuthGuard], data: { header: false } },
  { path: 'login', component: LoginComponent },
  {
    path: 'administration', component: AdministrationComponent, data: { header: false },
    resolve: {
      artres: ArtisansResolver
    }
  },
  { path: 'newArtisan', component: ArtisanAddComponent, data: { header: false } },
  { path: 'editArtisan/:id', component: ArtisanEditComponent, data: { header: false } },
  { path: 'newEvent', component: EventAddComponent, data: { header: false } },
  { path: 'editEvent/:id', component: EventEditComponent, data: { header: false } },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
  providers: [ArtisansResolver]
})
export class AppRoutingModule { }
