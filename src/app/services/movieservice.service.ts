import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './baseurl';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {

  constructor(private _http:HttpClient) { }

  public allmovies()
  {
    return this._http.get(`${baseUrl}/getAllMovies`);
   // return this._http.get(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/mymovieresource`);
  }

  public addMovie(movie:any)
  {
    return this._http.post(`${baseUrl}/addMovie`,movie);
   // return this._http.post(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/mymovieresource`,movie);
  }

  public deleteMovie(mid:number)
  {
    return this._http.delete(`${baseUrl}/deleteMovieById/${mid}`);
    //return this._http.delete(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/moviebyid/${mid}`);
  }

  public alltickets()
  {
    return this._http.get(`${baseUrl}/getAllBookedTickets`);
    //return this._http.get(`https://c6yl9pv8qg.execute-api.us-west-2.amazonaws.com/DeploymentMovieFinal/myticketresource`);
  }

  public ticketByName(mname:any)
  {
    return this._http.get(`${baseUrl}/getAllBookedTickets/${mname}`);
  }

}
