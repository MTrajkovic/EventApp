import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Events } from '../models/conference.model';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  softEdit(event: Event) {
    throw new Error('Method not implemented.');
  }
  madeReservation$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseApiURL}events`);
  }

  softDelete(event: Event): Observable<Object> {
    return this.http.delete(`${environment.baseApiURL}events/${event.id}`);
  }

  createEvent(event: Event): Observable<Object> {
    return this.http.post(`${environment.baseApiURL}events`, event);
  }

 updateEvent(event: Event): Observable<Object> {
    return this.http.put(`${environment.baseApiURL}events/${event.id}`, event);
  }
}
