import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TableOfReservationsComponent } from './components/table-of-events/table-of-events.component';
import { CreateReservationDialogComponent } from './components/create-event-dialog/create-event-dialog.component';
import { AdminDirective } from './directives/admin.directive';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const COMPONENTS = [AdminComponent, TableOfReservationsComponent, CreateReservationDialogComponent];

@NgModule({
  declarations: [...COMPONENTS, AdminDirective],
  imports: [CommonModule, ReservationRoutingModule, RouterModule, SharedModule, MatTableModule, MatDialogModule, FormsModule, ReactiveFormsModule],
})
export class ReservationModule {}


