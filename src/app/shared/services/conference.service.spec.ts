import { TestBed } from '@angular/core/testing';

import { ConferenceService } from './conference.service';

describe('ReservationService', () => {
  let service: ConferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
