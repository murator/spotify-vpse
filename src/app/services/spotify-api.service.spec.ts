import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SpotifyApiService } from './spotify-api.service';

describe('SpotifyApiService', () => {
  let service: SpotifyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SpotifyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
