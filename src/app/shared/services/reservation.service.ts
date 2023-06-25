import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  softEdit(reservation: Reservation) {
    throw new Error('Method not implemented.');
  }
  madeReservation$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.baseApiURL}events`);
  }

  softDelete(reservation: Reservation): Observable<Object> {
    return this.http.delete(
      `${environment.baseApiURL}events/${reservation.id}`
    );
  }

  createReservation(reservation: Reservation): Observable<Object> {
    return this.http.post(`${environment.baseApiURL}events`, reservation);
  }
}
