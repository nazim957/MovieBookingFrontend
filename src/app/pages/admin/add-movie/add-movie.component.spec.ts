import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AddMovieComponent } from './add-movie.component';
import { Movie } from './movie';
import { MovieserviceService } from 'src/app/services/movieservice.service';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let moviesService: MovieserviceService;
  let snackBar: MatSnackBar;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddMovieComponent],
      providers: [MovieserviceService, MatSnackBar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MovieserviceService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a movie successfully', () => {
    const movieObj: Movie = {
      movieId: '1',
      movieName: 'Avengers',
      theaterName: 'Pacific',
      totalSeats: '100',
    };

    spyOn(moviesService, 'addMovie').and.returnValue(of({}));
    spyOn(snackBar, 'open');
    spyOn(Swal, 'fire');

    component.movieObj = movieObj;
    component.addMovie();

    expect(moviesService.addMovie).toHaveBeenCalledWith(movieObj);
    expect(snackBar.open).toHaveBeenCalledWith('Success', 'Movie Added', { duration: 3000 });
    expect(component.movieObj).toEqual(new Movie());
    expect(Swal.fire).toHaveBeenCalledWith('Success', 'Movie Added', 'success');
  });

  it('should handle error while adding a movie', () => {
    const movieObj: Movie = {
      movieId: '1',
      movieName: 'Avengers',
      theaterName: 'Pacific',
      totalSeats: '100',
    };

    const error = 'Error occurred while adding a movie.';
    spyOn(moviesService, 'addMovie').and.returnValue(throwError(error));
    spyOn(snackBar, 'open');
    spyOn(console, 'error');
    spyOn(Swal, 'fire');

    component.movieObj = movieObj;
    component.addMovie();

    expect(moviesService.addMovie).toHaveBeenCalledWith(movieObj);
    expect(snackBar.open).toHaveBeenCalledWith('Error', 'Error in adding', { duration: 3000 });
    expect(console.error).toHaveBeenCalledWith(error);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error in adding', 'error');
  });
});
