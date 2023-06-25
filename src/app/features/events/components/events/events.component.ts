import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil, Subject, debounceTime } from 'rxjs';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  events?: Event[];

  eventsCounter?: number;

  searchedValue: string = '';

  private subscription$: Subject<void> = new Subject<void>();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEventsByTitle();
    this.getSearchValue();
    this.getAllEvents();
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }

  private getAllEvents(): void {
    this.eventService
      .getAll()
      .pipe(take(1))
      .subscribe((events) => (this.events = events));
  }

  private getSearchValue(): void {
    this.eventService.searchedValue$
      .pipe(takeUntil(this.subscription$), debounceTime(3000))
      .subscribe((value) => {
        this.searchedValue = value;
        this.getEventsByTitle();
      });
  }

  private getEventsByTitle(): void {
    this.eventService
      .getEventsByTitle(this.searchedValue)
      .pipe(take(1))
      .subscribe((events) => {
        this.events = events;
        this.eventsCounter = events.length;
      });
  }
}
