import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {

  constructor(public login:LoginService)
  {}

  public logout()
  {
    this.login.logout();
     window.location.reload();
   // this.router.navigateByUrl("/login")
   // this.login.loginStatusSubject.next(false);
  }

}
