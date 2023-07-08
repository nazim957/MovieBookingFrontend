import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieserviceService } from './movieservice.service';
import { HttpClient } from '@angular/common/http';

fdescribe('MovieserviceService', () => {
  let movieservice: MovieserviceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieserviceService]
    });
    movieservice = TestBed.inject(MovieserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a movie', () => {
    const movie = {
      movieId: '1',
      movieName: 'Avengers',
      theaterName: 'Pacific',
      totalSeats: '100'
    };

    movieservice.addMovie(movie).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.movieId).toBe('1');
      expect(data.movieName).toBe('Avengers');
      expect(data.theaterName).toBe('Pacific');
      expect(data.totalSeats).toBe('100');
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/addMovie');
    expect(req.request.method).toBe('POST');
    req.flush(movie);
  });

  it('should get all movies', () => {
    const mockMovies = [
      {
        movieId: '1',
        movieName: 'Avengers',
        theaterName: 'Pacific',
        totalSeats: '100',
      },
      {
        movieId: '2',
        movieName: 'Fast X',
        theaterName: 'Pacific',
        totalSeats: '200',
      }
    ];

    movieservice.allmovies().subscribe((movies: any) => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/getAllMovies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should delete a movie by ID', () => {
    const movieId = 1;

    movieservice.deleteMovie(movieId).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/v1/deleteMovieById/${movieId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

})
