import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketByNameComponent } from './ticket-by-name.component';

describe('TicketByNameComponent', () => {
  let component: TicketByNameComponent;
  let fixture: ComponentFixture<TicketByNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketByNameComponent]
    });
    fixture = TestBed.createComponent(TicketByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
