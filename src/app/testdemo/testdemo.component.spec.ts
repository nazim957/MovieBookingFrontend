import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdemoComponent } from './testdemo.component';

describe('TestdemoComponent', () => {
  let component: TestdemoComponent;
  let fixture: ComponentFixture<TestdemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestdemoComponent]
    });
    fixture = TestBed.createComponent(TestdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 13',()=>{
    expect(component.sum(10,3)).toEqual(13);
  })
});
