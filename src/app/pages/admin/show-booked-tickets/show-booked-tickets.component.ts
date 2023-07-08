import { AfterViewInit, Component , Input, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MovieserviceService } from 'src/app/services/movieservice.service';
import { Alltickets } from './alltickets';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-show-booked-tickets',
  templateUrl: './show-booked-tickets.component.html',
  styleUrls: ['./show-booked-tickets.component.css']
})
export class ShowBookedTicketsComponent implements OnInit,AfterViewInit{

  @Input("ELEMENT_DATA") ELEMENT_DATA!:Alltickets[]
  displayedColumns: string[] = [
    'transactionId',
   'movieName',
  'totalSeats',
'availableSeats',
'bookedSeats',
];
dataSource = new MatTableDataSource<Alltickets>(this.ELEMENT_DATA)

@ViewChild('paginator') paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(private _viewmovie:MovieserviceService)
{}

ngOnInit(): void{
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
    let resp=this._viewmovie.alltickets();
    resp.subscribe(report=>this.dataSource.data=report as Alltickets[])
  }

}
