import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfReservationsComponent } from './table-of-events.component';

describe('TableOfReservationsComponent', () => {
  let component: TableOfReservationsComponent;
  let fixture: ComponentFixture<TableOfReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOfReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
