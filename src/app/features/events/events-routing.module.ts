import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventId',
    canActivate: [AuthGuard],
    component: EventOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
