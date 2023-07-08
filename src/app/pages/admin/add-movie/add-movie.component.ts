import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieserviceService } from 'src/app/services/movieservice.service';
import { Movie } from './movie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

  movieObj: Movie = new Movie();

  constructor(private _snack:MatSnackBar, private service:MovieserviceService)
  {

  }

  addMovie()
  {
  
    if(this.movieObj.movieId.trim()=='' || this.movieObj.movieId==null)
    {
       this._snack.open("Id Required" , '' ,{
         duration:3000
       });
       return
    }
    this.service.addMovie(this.movieObj).subscribe(
      (data)=>{
        Swal.fire('Success' , 'movie Added', 'success')
        this.movieObj={
            movieId:'',
            movieName:'',
            theaterName:'',
            totalSeats:'',
          
        }
      },
      (error)=>{
        Swal.fire("Error" , 'Error in adding', 'error')
        console.log(error)
      }
      )
  }

}
