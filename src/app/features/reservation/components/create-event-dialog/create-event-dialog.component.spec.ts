import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationDialogComponent } from './create-event-dialog.component';

describe('CreateReservationDialogComponent', () => {
  let component: CreateReservationDialogComponent;
  let fixture: ComponentFixture<CreateReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReservationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
