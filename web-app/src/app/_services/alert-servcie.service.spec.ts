import { TestBed, inject } from '@angular/core/testing';

import { AlertServcieService } from './alert-servcie.service';

describe('AlertServcieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertServcieService]
    });
  });

  it('should be created', inject([AlertServcieService], (service: AlertServcieService) => {
    expect(service).toBeTruthy();
  }));
});
