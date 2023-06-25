import { take } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'src/app/shared/services/event.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss'],
})
export class CreateReservationDialogComponent implements OnInit {
  reservationForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z]{1,119}/),
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/),

    ]),
    description: new FormControl('', [Validators.required]),
    organizatorFirstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z]{0,19}/),
    ]),
    organizatorLastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z]{0,19}/),
    ]),
    conferenceDate: new FormControl('', [Validators.required]),
  });

  private registrationID: number = 0;

  constructor(
    private eventService: EventService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.eventService.getEventByID(this.data.id).subscribe((event) => {
      const conferenceDate = event.date.substring(0, 10);
      this.reservationForm.patchValue({
        title: event.title,
        imageUrl: event.imageUrl,
        description: event.description,
        organizatorFirstName: event.organizatorFirstName,
        organizatorLastName: event.organizatorLastName,
        conferenceDate: conferenceDate,
      });
    });
    this.getLastRegistrationID();
    this.reservationForm.patchValue(this.data);
  }

  saveReservation(): void {
    const reservation: Reservation = {
      id: this.registrationID,
      title: this.reservationForm.value.title,
      imageUrl: this.reservationForm.value.imageUrl,
      organizatorLastName: this.reservationForm.value.organizatorLastName,
      description: this.reservationForm.value.description,
      organizatorFirstName: this.reservationForm.value.organizatorFirstName,
      conferenceDate: this.reservationForm.value.conferenceDate,
      deletedAt: null,
    };

    this.reservationService
      .createReservation(reservation)
      .pipe(take(1))
      .subscribe(() => {
        this._snackBar.open('Event create successfuly', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
        });

        this.reservationService.madeReservation$.next(true);
      });
  }

  private getLastRegistrationID() {
    this.reservationService
      .getAll()
      .pipe(take(1))
      .subscribe((registrations: Reservation[]) => {
        this.registrationID = registrations[registrations.length - 1].id + 1;
      });
  }
}
