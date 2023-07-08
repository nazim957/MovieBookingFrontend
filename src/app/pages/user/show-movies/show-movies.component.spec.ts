import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';

import { ShowMoviesComponent } from './show-movies.component';
import { MovieserviceService } from 'src/app/services/movieservice.service';

describe('ShowMoviesComponent', () => {
  let component: ShowMoviesComponent;
  let fixture: ComponentFixture<ShowMoviesComponent>;
  let movieserviceService: MovieserviceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ShowMoviesComponent],
      providers: [MovieserviceService, MatSnackBar]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMoviesComponent);
    component = fixture.componentInstance;
    movieserviceService = TestBed.inject(MovieserviceService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllReports method on ngOnInit', () => {
    spyOn(component, 'getAllReports');
    component.ngOnInit();
    expect(component.getAllReports).toHaveBeenCalled();
  });

  it('should set the paginator and sort after view initialization', () => {
   component.ngAfterViewInit();
  });

  it('should filter the data source on applyFilter', () => {
    const event = { target: { value: 'search' } } as unknown as Event;
    component.dataSource = new MatTableDataSource<any>([
      { movieId: '1', movieName: 'Movie 1', theaterName: 'Theater 1', availableSeats: 100, bookedTickets: 50 },
      { movieId: '2', movieName: 'Movie 2', theaterName: 'Theater 2', availableSeats: 80, bookedTickets: 20 },
    ]);

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('search');
  });

  it('should call allmovies service and set the dataSource on getAllReports', () => {
    const mockMovies = [
      { movieId: '1', movieName: 'Movie 1', theaterName: 'Theater 1', availableSeats: 100, bookedTickets: 50 },
      { movieId: '2', movieName: 'Movie 2', theaterName: 'Theater 2', availableSeats: 80, bookedTickets: 20 },
    ];
    spyOn(movieserviceService, 'allmovies').and.returnValue(of(mockMovies));

    component.getAllReports();

    expect(movieserviceService.allmovies).toHaveBeenCalled();
  });

  // it('should show alert with movieId on addTicket', () => {
  //   spyOn(window, 'alert');
  //   const movieId = '1';

  //   component.addTicket(movieId);

  //   expect(window.alert).toHaveBeenCalledWith(movieId);
  // });
});
