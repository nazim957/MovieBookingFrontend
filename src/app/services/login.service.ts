import { Injectable } from '@angular/core';
import baseUrl from './baseurl';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //current user: who is logged in
  public getCurrentUser()
  {
    return this.http.get(`http://localhost:8082/current-user`)
  // return this.http.get(`http://52.36.187.62:8082/current-user`)
  // return this.http.get(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/myuserresouce`)
  }

  //generate token

  public generateToken(loginData:any)
  { 
    return this.http.post(`http://localhost:8081/call/consumer/login`,loginData)
    //return this.http.post(`http://52.36.187.62:8081/call/consumer/login`,loginData)
    //return this.http.get(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/myuserresouce`,loginData)
  }

  //Login user: set token in LocalStorage so that if we close browser token will be there
  public loginUser(token: string)
  {
    localStorage.setItem('token',token)
   // this.loginStatusSubject.next(true)
    return true;
  }

  //check user is login or not
  public isLockedIn()
  { 
    let tokenStr=localStorage.getItem('token')
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false
    }
    else{
      return true
    }
  }

  //logout : remove token from local storage
  public logout()
  {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true;
  }

  //get token
  public getToken()
  {
    return localStorage.getItem('token')
  }

  //set user detail creating to reduce server call
  public setUser(user:string)
  {
    localStorage.setItem('user', JSON.stringify(user))
  }

  //get User
  public getUser()
  {
    let userStr=localStorage.getItem("user")
    if(userStr!=null)
    {
      return JSON.parse(userStr)
    }
    //if no user then logout it
    else{
      this.logout()
      return null
    }
  }

  //get user role
  public getUserRole()
  {
    let user=this.getUser()
    return user.authorities[0].authority
  }
}
