import { take } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'src/app/shared/services/event.service';
import { ConferenceService } from 'src/app/shared/services/conference.service';
import { Events } from 'src/app/shared/models/conference.model';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss'],
})
export class CreateEventDialogComponent implements OnInit {
  conferenceForm = new FormGroup({
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
    private conferenceService: ConferenceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data.id){
    this.eventService.getEventByID(this.data.id).subscribe((event) => {
      const conferenceDate = event.date.substring(0, 10);
      this.conferenceForm.patchValue({
        title: event.title,
        imageUrl: event.imageUrl,
        description: event.description,
        organizatorFirstName: event.organizatorFirstName,
        organizatorLastName: event.organizatorLastName,
        conferenceDate: conferenceDate,
      });
    }) ;   }
    this.getLastRegistrationID();
    this.conferenceForm.patchValue(this.data);
  }

  saveEvent(): void {
    const event: Event = {
      id: this.data.id,
      title: this.conferenceForm.value.title,
      imageUrl: this.conferenceForm.value.imageUrl,
      organizatorLastName: this.conferenceForm.value.organizatorLastName,
      description: this.conferenceForm.value.description,
      organizatorFirstName: this.conferenceForm.value.organizatorFirstName,
      conferenceDate: this.conferenceForm.value.conferenceDate,
      date: new Date().toISOString(),
    };

    this.conferenceService
      .createEvent(event)
      .pipe(take(1))
      .subscribe(() => {
        this._snackBar.open('Event create successfuly', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
        });

        this.conferenceService.madeReservation$.next(true);
      });
  }

  updateEvent(): void {
    const event: Event = {
      id: this.data.id,
      title: this.conferenceForm.value.title,
      imageUrl: this.conferenceForm.value.imageUrl,
      organizatorLastName: this.conferenceForm.value.organizatorLastName,
      description: this.conferenceForm.value.description,
      organizatorFirstName: this.conferenceForm.value.organizatorFirstName,
      conferenceDate: this.conferenceForm.value.conferenceDate,
      date: new Date().toISOString(),
    };

    this.conferenceService
      .updateEvent(event)
      .pipe(take(1))
      .subscribe(() => {
        this._snackBar.open('Event update successfuly', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
        });

        this.conferenceService.madeReservation$.next(true);
      });
  }

  private getLastRegistrationID() {
    this.conferenceService
      .getAll()
      .pipe(take(1))
      .subscribe((registrations: Events[]) => {
        this.registrationID = registrations[registrations.length - 1].id + 1;
      });
  }
}
