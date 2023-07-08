import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Allmovies } from '../allmovies';
import { MovieserviceService } from 'src/app/services/movieservice.service';
import { ViewMoviesComponent } from './view-movies.component';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewMoviesComponent', () => {
  let component: ViewMoviesComponent;
  let fixture: ComponentFixture<ViewMoviesComponent>;
  let movieserviceService: MovieserviceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMoviesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [MovieserviceService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoviesComponent);
    component = fixture.componentInstance;
    movieserviceService = TestBed.inject(MovieserviceService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all movies on initialization', () => {
    const movies: Allmovies[] = [
      { movieId: '1', movieName: 'Avengers', theaterName: 'Pacific', totalSeats: 100, availableSeats: 50 },
      { movieId: '2', movieName: 'Avengers', theaterName: 'Pacific', totalSeats: 200, availableSeats: 100},
    ];
    const getAllMoviesSpy = spyOn(movieserviceService, 'allmovies').and.returnValue(of(movies));
  
    component.ngOnInit();
  
    expect(getAllMoviesSpy).toHaveBeenCalled();
    expect(component.ELEMENT_DATA).toEqual(movies);
    expect(component.dataSource.data).toEqual(movies);
  });
  
  it('should handle error while retrieving movies on initialization', () => {
    const error = 'Error occurred while retrieving movies.';
    const getAllMoviesSpy = spyOn(movieserviceService, 'allmovies').and.returnValue(
      throwError(error)
    );
   
    component.ngOnInit();

    expect(getAllMoviesSpy).toHaveBeenCalled();
  });

  it('should delete a movie', () => {
    const movieId = '1';
    const deletedMovie = { movieId: '1', movieName: 'Avengers', theaterName: 'Pacific', totalSeats: 100, availableSeats: 50, bookedSeats: 50 };
    component.ELEMENT_DATA = [deletedMovie];
    component.dataSource = new MatTableDataSource<Allmovies>(component.ELEMENT_DATA);

    const deleteMovieSpy = spyOn(movieserviceService, 'deleteMovie').and.returnValue(of({}));

    component.deleteMovie(Number(movieId));

    expect(deleteMovieSpy).toHaveBeenCalledWith(Number(movieId));
    expect(component.ELEMENT_DATA).toEqual([]);
    expect(component.dataSource.data).toEqual([]);
  });
});
