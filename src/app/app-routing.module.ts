import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ViewMoviesComponent } from './pages/admin/view-movies/view-movies.component';
import { AddMovieComponent } from './pages/admin/add-movie/add-movie.component';
import { ShowBookedTicketsComponent } from './pages/admin/show-booked-tickets/show-booked-tickets.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ShowMoviesComponent } from './pages/user/show-movies/show-movies.component';
import { AddTicketComponent } from './pages/user/add-ticket/add-ticket.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { UserwelcomeComponent } from './pages/user/userwelcome/userwelcome.component';
import { TicketByNameComponent } from './pages/admin/ticket-by-name/ticket-by-name.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
   {
     path:'forgot',
    component:ForgotpasswordComponent,
     pathMatch:'full'
   },
  {
    path:'admin',
    component:DashboardComponent,
     canActivate:[AdminGuard],
     children: [
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'viewmovies',
        component:ViewMoviesComponent,
        pathMatch:'full'
      },
      {
        path:'addmovie',
        component:AddMovieComponent
      },
      {
        path:'showtickets',
        component:ShowBookedTicketsComponent
      },
      {
        path:'ticketbyname/:mname',
        component:TicketByNameComponent
      }
         
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
     canActivate:[NormalGuard],
    children:[
      {
       path:'',
       component:UserwelcomeComponent
      },
      {
        path:'viewmovies',
        component:ShowMoviesComponent
      },
      
      {
        path:'addticket/:mid/:mname/:tname',
        component:AddTicketComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
