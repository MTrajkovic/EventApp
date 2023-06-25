import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CreateReservationDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { EventService } from 'src/app/shared/services/event.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'app-table-of-events',
  templateUrl: './table-of-events.component.html',
  styleUrls: ['./table-of-events.component.scss'],
})
export class TableOfReservationsComponent implements OnInit, OnDestroy {
  dialog: any;
createReservation() {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = [
    'dots',
    'id',
    'title',
    'location',
    'date',
    'currentCreation',
    'edit',
    'delete',
  ];

  dataSource!: Reservation[];

  events?: Event[];

  isAdmin: boolean = false;

  private subscription$: Subject<void> = new Subject<void>();

  constructor(
    private _dialog: MatDialog,
    private reservationService: ReservationService,
    private eventService: EventService,
    private authService: AuthorizationService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAllEvents();
    this.getAllReservation();
    this.isReservationSaved();
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }


  onDelete(reservation: Reservation): void {
    this.reservationService
      .softDelete(reservation)
      .pipe(take(1))
      .subscribe(() => this.getAllReservation());
  }

  onCreateReservation(data: any) {
    const dialogRef = this._dialog.open(CreateReservationDialogComponent, {
      data: {id: data.id},
      position: { top: '40px' },
      width: '50%',
    });
  }

  private getAllReservation(): void {
    this.reservationService
      .getAll()
      .pipe(takeUntil(this.subscription$))
      .subscribe((reservations) => (this.dataSource = reservations));
  }
  private getAllEvents(): void {
    this.eventService
      .getAll()
      .pipe(take(1))
      .subscribe((events) => (this.events = events));
  }

  private isReservationSaved(): void {
    this.reservationService.madeReservation$
      .pipe(takeUntil(this.subscription$))
      .subscribe(() => {
        this.getAllReservation();
      });
  }
}

