import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import Swal from 'sweetalert2';
import { AddTicketComponent } from './add-ticket.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('AddTicketComponent', () => {
  let component: AddTicketComponent;
  let fixture: ComponentFixture<AddTicketComponent>;
  let ticketService: TicketService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTicketComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                mid: '1',
                mname: 'Avengers',
                tname: 'Pacific',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketComponent);
    component = fixture.componentInstance;
    ticketService = TestBed.inject(TicketService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ticketObj with movie details', () => {
    expect(component.ticketObj.movie_id_fk).toEqual('1');
    expect(component.ticketObj.movieName).toEqual('Avengers');
    expect(component.ticketObj.theaterName).toEqual('Pacific');
  });

  it('should add a ticket', fakeAsync(() => {
    const ticketObj = { bookedSeats: 2 };
    const addTicketSpy = spyOn(ticketService, 'addTicket').and.returnValue(of({ Message: 'Added' }));
    const swalFireSpy = spyOn(Swal, 'fire');

    component.addTicket();

    expect(addTicketSpy).toHaveBeenCalledWith(component.ticketObj, '1');
    tick();
    expect(swalFireSpy).toHaveBeenCalledWith('success', 'Ticket added', 'success');
  }));

  it('should handle error while adding a ticket', fakeAsync(() => {
    const ticketObj = { bookedSeats: 2 };
    const error = 'Error occurred while adding a ticket.';
    const addTicketSpy = spyOn(ticketService, 'addTicket').and.returnValue(throwError(error));
    const swalFireSpy = spyOn(Swal, 'fire');

    component.addTicket();

    expect(addTicketSpy).toHaveBeenCalledWith(component.ticketObj, '1');
    tick();
    expect(swalFireSpy).toHaveBeenCalledWith('error', 'Error in adding ticket', 'error');
  }));

  it('should handle already sold tickets', fakeAsync(() => {
    const ticketObj = { bookedSeats: 0 };
    const addTicketSpy = spyOn(ticketService, 'addTicket').and.returnValue(of({ Message: 'Sold' }));
    const swalFireSpy = spyOn(Swal, 'fire');

    component.addTicket();

    expect(addTicketSpy).toHaveBeenCalledWith(component.ticketObj, '1');
    tick();
    expect(swalFireSpy).toHaveBeenCalledWith(
      'error',
      'Sorry all Tickets are already sold Search for other Movies',
      'error'
    );
  }));

  it('should handle null or invalid booked seats', () => {
    const invalidTicketObj = { bookedSeats: null };
    const addTicketSpy = spyOn(ticketService, 'addTicket');

    component.ticketObj.bookedSeats = null;
    component.addTicket();
    expect(addTicketSpy).not.toHaveBeenCalled();

    component.ticketObj.bookedSeats = 0;
    component.addTicket();
    expect(addTicketSpy).not.toHaveBeenCalled();

    component.ticketObj.bookedSeats = -1;
    component.addTicket();
    expect(addTicketSpy).not.toHaveBeenCalled();
  });
});
