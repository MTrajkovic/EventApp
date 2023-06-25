import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EventsRoutingModule } from './events-routing.module';

const COMPONENTS = [
  EventsComponent,
  EventOverviewComponent,
  EventCardComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, SharedModule, RouterModule, EventsRoutingModule],
  exports: [...COMPONENTS],
})
export class EventsModule {}
