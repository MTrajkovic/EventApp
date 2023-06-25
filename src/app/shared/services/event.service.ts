import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, map, Subject } from 'rxjs';
import { Event } from 'src/app/shared/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  searchedValue$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseApiURL}events`);
  }

  getEventByID(id: number): Observable<Event> {
    return this.http.get<Event>(`${environment.baseApiURL}events/${id}`);
  }

  getEventsByTitle(eventName: string): Observable<Event[]> {
    return this.http
      .get<Event[]>(`${environment.baseApiURL}events`)
      .pipe(
        map((events) =>
          events.filter((events) =>
            events.title.toLowerCase().includes(eventName.toLowerCase())
          )
        )
      );
  }
}
