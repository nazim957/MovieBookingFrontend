import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Alltickets } from '../show-booked-tickets/alltickets';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MovieserviceService } from 'src/app/services/movieservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-by-name',
  templateUrl: './ticket-by-name.component.html',
  styleUrls: ['./ticket-by-name.component.css']
})
export class TicketByNameComponent implements OnInit,AfterViewInit {

  mname:any;

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

constructor(private _viewmovie:MovieserviceService,private _route:ActivatedRoute)
{}

ngOnInit(): void{
  this.mname=this._route.snapshot.params['mname']
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
    let resp=this._viewmovie.ticketByName(this.mname);
    resp.subscribe(report=>this.dataSource.data=report as Alltickets[])
  }

}
