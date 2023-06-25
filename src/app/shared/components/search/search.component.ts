import { EventService } from 'src/app/shared/services/event.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private eventService: EventService) {}

  onSearch(searchValue: string): void {
    this.eventService.searchedValue$.next(searchValue);
  }
}
