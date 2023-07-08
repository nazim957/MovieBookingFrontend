import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  //add user

  public addUser(user:any)
  {
      return this.http.post(`http://localhost:8082/user/`, user);
      //return this.http.post(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/registerresource`, user);
  }

  public forgotPassword(forgotData:any, email:any)
  {
     return this.http.put(`http://localhost:8082/user/forgot/${email}`, forgotData)
    //return this.http.put(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/registerresource/${userName}`, forgotData)
  }
}
