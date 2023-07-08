import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewMoviesComponent } from './pages/admin/view-movies/view-movies.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AddMovieComponent } from './pages/admin/add-movie/add-movie.component';
import { ShowBookedTicketsComponent } from './pages/admin/show-booked-tickets/show-booked-tickets.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { AddTicketComponent } from './pages/user/add-ticket/add-ticket.component';
import { ShowMoviesComponent } from './pages/user/show-movies/show-movies.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { AuthInterceptorProviders } from './services/auth.interceptor';
import { UserwelcomeComponent } from './pages/user/userwelcome/userwelcome.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TicketByNameComponent } from './pages/admin/ticket-by-name/ticket-by-name.component';
import { MatSelectModule } from '@angular/material/select';
import { TestdemoComponent } from './testdemo/testdemo.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ViewMoviesComponent,
    DashboardComponent,
    AddMovieComponent,
    ShowBookedTicketsComponent,
    SidebarComponent,
    WelcomeComponent,
    ForgotpasswordComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    AddTicketComponent,
    ShowMoviesComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    UserwelcomeComponent,
    TicketByNameComponent,
    TestdemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
