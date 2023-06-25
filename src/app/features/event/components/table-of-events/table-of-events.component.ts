import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConferenceService } from 'src/app/shared/services/conference.service';
import { EventService } from 'src/app/shared/services/event.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Event } from 'src/app/shared/models/event.model';
import { Events } from 'src/app/shared/models/conference.model';

@Component({
  selector: 'app-table-of-events',
  templateUrl: './table-of-events.component.html',
  styleUrls: ['./table-of-events.component.scss'],
})
export class TableOfEventsComponent implements OnInit, OnDestroy {
  dialog: any;
  createReservation() {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    'dots',
    'id',
    'title',
    'organizator',
    'date',
    'currentCreation',
    'edit',
    'delete',
  ];

  dataSource!: Events[];

  events?: Event[];

  isAdmin: boolean = false;

  private subscription$: Subject<void> = new Subject<void>();

  constructor(
    private _dialog: MatDialog,
    private confereceService: ConferenceService,
    private eventService: EventService,
    private authService: AuthorizationService
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

  onDelete(event: Event): void {
    this.confereceService
      .softDelete(event)
      .pipe(take(1))
      .subscribe(() => this.getAllReservation());
  }

  onCreateEvent(data: any) {
    const dialogRef = this._dialog.open(CreateEventDialogComponent, {
      data: { id: data.id },
      position: { top: '40px' },
      width: '50%',
    });
  }

  private getAllReservation(): void {
    this.confereceService
      .getAll()
      .pipe(takeUntil(this.subscription$))
      .subscribe((events) => (this.dataSource = events));
  }
  private getAllEvents(): void {
    this.eventService
      .getAll()
      .pipe(take(1))
      .subscribe((events) => (this.events = events));
  }

  private isReservationSaved(): void {
    this.confereceService.madeReservation$
      .pipe(takeUntil(this.subscription$))
      .subscribe(() => {
        this.getAllReservation();
      });
  }
}
