import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Allmovies } from '../allmovies';
import { MovieserviceService } from 'src/app/services/movieservice.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit,AfterViewInit  {

  
  @Input("ELEMENT_DATA") ELEMENT_DATA: Allmovies[] = [];
  displayedColumns: string[] = [
    'movieId',
    'movieName',
    'theaterName',
    'totalSeats',
    'availableSeats',
    'bookedSeats',
    'action',
  ];

  dataSource = new MatTableDataSource<Allmovies>(this.ELEMENT_DATA);

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(
    private _viewmovie: MovieserviceService,
    private _snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.getAllReports();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getAllReports() {
    let resp = this._viewmovie.allmovies();
    resp.subscribe((report) => {
      this.ELEMENT_DATA = report as Allmovies[];
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  deleteMovie(mid: number) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confirmed
        this._viewmovie.deleteMovie(mid).subscribe(
          (result) => {
            this._snack.open('Movie Deleted', '', {
              duration: 3000,
            });

            // Remove the deleted movie from the ELEMENT_DATA array
            this.ELEMENT_DATA = this.ELEMENT_DATA.filter(
              (movie) => movie.movieId !== mid
            );

            // Update the dataSource with the updated ELEMENT_DATA
            this.dataSource.data = this.ELEMENT_DATA;

            // Navigate to the viewmovies route
            this.router.navigate(['/admin/viewmovies']);
          },
          (error) => {
            this._snack.open('Error in deleting Movie', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }
}
