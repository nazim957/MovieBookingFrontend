import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';

fdescribe('TicketService', () => {
  let service: TicketService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TicketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to add a ticket', () => {
    const ticketObj = { bookedSeats: 2 };
    const movieId = '1';
    const mockResponse = { Message: 'Added' };

    service.addTicket(ticketObj, movieId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`http://localhost:8081/api/v1/tickets/add/${movieId}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(ticketObj);

    req.flush(mockResponse);
  });
});
