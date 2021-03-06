import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsComponent } from './components/projects/projects.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/admin/login/login.component';
// import { IndexComponent } from './components/admin/index/index.component';
// import { AdminProjectsComponent } from './components/admin/index/projects/adminProjects.component';
// import { AdminArtisansComponent } from './components/admin/index/artisans/adminArtisans.component';
// import { AdminAchivementsComponent } from './components/admin/index/achievements/adminAchievements.component';
// import { AdminActivitiesComponent } from './components/admin/index/activities/adminActivities.component';
// import { AdminEventsComponent } from './components/admin/index/events/adminEvents.component';
import { ArtisanCvComponent } from './components/artisan-cv/artisan-cv.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TeamComponent } from './components/team/team.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { fakeBackendProvider } from './helpers/fake-backend';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EventsComponent } from './components/events/events.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ArtisanAddComponent } from './components/artisan-add/artisan-add.component';
import { ArtisanEditComponent } from './components/artisan-edit/artisan-edit.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import {MatTabsModule} from '@angular/material/tabs';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader.service';
import { LoaderInterceptor } from './shared/loader.interceptor';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ArtisanCvComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsComponent,
    ActivitiesComponent,
    TeamComponent,
    LoginComponent,
    // IndexComponent,
    // AdminProjectsComponent,
    // AdminArtisansComponent,
    // AdminEventsComponent,
    // AdminAchivementsComponent,
    // AdminActivitiesComponent,
    FilterPipe,
    EventsComponent,
    AdministrationComponent,
    ArtisanAddComponent,
    ArtisanEditComponent,
    EventEditComponent,
    EventAddComponent,
    LoaderComponent,
    EventDetailsComponent,
    NotFoundComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      // {path: 'admin', component: IndexComponent},
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    [
      LoaderService,{provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    ],
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    // provider used to create fake backend
    // fakeBackendProvider,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }