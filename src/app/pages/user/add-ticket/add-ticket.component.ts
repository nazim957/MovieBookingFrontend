import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import Swal from 'sweetalert2';
import { Addticket } from './addticket';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  mid: any;
  mname: any;
  tname: any;

  ticketObj: Addticket = new Addticket();

  constructor(private _route: ActivatedRoute, private service: TicketService, private router:Router) {}

  ngOnInit(): void {
    this.mid = this._route.snapshot.params['mid'];
    this.mname = this._route.snapshot.params['mname'];
    this.tname = this._route.snapshot.params['tname'];
    this.ticketObj.movie_id_fk = this.mid;
    this.ticketObj.movieName = this.mname;
    this.ticketObj.theaterName = this.tname;
  }

  addTicket() {
    if (this.ticketObj.bookedSeats == null) {
      return;
    }

    if (this.ticketObj.bookedSeats < 1) {
      Swal.fire('error', 'Number of Tickets should be greater than one', 'error');
      return;
    }

    this.service.addTicket(this.ticketObj, this.mid).subscribe(
      (data: any) => {
        if (data.Message === 'Added') {
          Swal.fire('success', 'Ticket added', 'success');
        } else if (data.Message === 'Sold') {
          Swal.fire('error', 'Sorry all Tickets are already sold Search for other Movies', 'error');
        } else {
          Swal.fire('error', 'Error in adding ticket', 'error');
        }
        this.router.navigate(['/user-dashboard']);
      },
      (error) => {
        Swal.fire('error', 'Error in adding ticket', 'error');
      }
    );
  }
}
