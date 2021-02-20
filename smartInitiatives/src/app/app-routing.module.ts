import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ArtisanCvComponent } from './components/artisan-cv/artisan-cv.component';
import { LandingComponent } from './components/landing/landing.component';
import { ArtisansResolver } from './resolvers/artisans.resolver';
import { LoginComponent } from './components/admin/login/login.component';
import { IndexComponent } from './components/admin/index/index.component';
import { AuthGuard } from './helpers/auth.guard';

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
  },
  { path: 'admin', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule],
  providers:[ArtisansResolver]
})
export class AppRoutingModule { }
