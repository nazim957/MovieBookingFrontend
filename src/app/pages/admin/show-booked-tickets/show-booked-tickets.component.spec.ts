import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookedTicketsComponent } from './show-booked-tickets.component';

describe('ShowBookedTicketsComponent', () => {
  let component: ShowBookedTicketsComponent;
  let fixture: ComponentFixture<ShowBookedTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowBookedTicketsComponent]
    });
    fixture = TestBed.createComponent(ShowBookedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
