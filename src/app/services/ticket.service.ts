import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private _http:HttpClient) { }

  public addTicket(ticketObj:any,mid:any){
    return this._http.post(`http://localhost:8081/api/v1/tickets/add/${mid}`,ticketObj)
   // return this._http.post(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/myticketresource/${mid}`,ticketObj)
  }
}
