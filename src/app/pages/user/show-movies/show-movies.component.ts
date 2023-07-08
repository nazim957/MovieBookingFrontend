import { AfterViewInit, Component, Input , OnInit, ViewChild } from '@angular/core';
import { Allmovies } from '../../admin/allmovies';
import { MatTableDataSource } from '@angular/material/table';
import { MovieserviceService } from 'src/app/services/movieservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-show-movies',
  templateUrl: './show-movies.component.html',
  styleUrls: ['./show-movies.component.css']
})
export class ShowMoviesComponent implements OnInit,AfterViewInit {

  @Input("ELEMENT_DATA") ELEMENT_DATA!:Allmovies[]
  displayedColumns: string[] = [
    'movieId',
   'movieName',
 'theaterName',
'availableSeats',
'bookedTickets',
];
  dataSource = new MatTableDataSource<Allmovies>(this.ELEMENT_DATA)

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _viewmovie:MovieserviceService, private _snack:MatSnackBar)
  {}
  ngOnInit(): void{
    // this._viewmovie.allmovies().subscribe((data:any)=>
    // {
    //   this.movies=data;
    //   console.log(this.movies);
    // }
    // ,
    // (error)=>{
    //   console.log(error);
    // }
    // )
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

  public getAllReports()
  {
    let resp=this._viewmovie.allmovies();
    resp.subscribe(report=>this.dataSource.data=report as Allmovies[])
  }

  // public addTicket(mid:any){
  //   alert(mid);
  // }

}
