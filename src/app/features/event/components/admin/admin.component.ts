import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  createReservation(): void {
    this.dialog.open(CreateEventDialogComponent, {
      data: {},
      position: { top: '40px' },
      width: '50%',
    });
  }
}
