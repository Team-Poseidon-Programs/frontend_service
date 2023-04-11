import { TestBed } from '@angular/core/testing';

import { HelpbotServiceService } from './helpbot-service.service';

describe('HelpbotServiceService', () => {
  let service: HelpbotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpbotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
