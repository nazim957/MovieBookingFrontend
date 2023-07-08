import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-userwelcome',
  templateUrl: './userwelcome.component.html',
  styleUrls: ['./userwelcome.component.css']
})
export class UserwelcomeComponent  {

  user=null;

  constructor(public login:LoginService)
  {}

  // ngOnInit(): void {
  //   this.user=this.login.getUser();
  //   this.login.loginStatusSubject.asObservable().subscribe(data=>{
  //   this.user=this.login.getUser();
  //   })

  //}

}
