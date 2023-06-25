import { take } from 'rxjs';
import { EventService } from 'src/app/shared/services/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'app-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss'],
})
export class EventOverviewComponent implements OnInit {
  event?: Event;

  private eventId!: number;

  constructor(
    private eventService: EventService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.activeRoute.snapshot.paramMap.get('eventId'));
    this.getSingleEvent(this.eventId);
  }

  private getSingleEvent(id: number) {
    this.eventService
      .getEventByID(id)
      .pipe(take(1))
      .subscribe((event) => (this.event = event));
  }
}
