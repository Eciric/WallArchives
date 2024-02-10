import { TestBed } from '@angular/core/testing';

import { WallService } from './wall.service';
import { HttpClientModule } from '@angular/common/http';

describe('WallService', () => {
  let service: WallService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(WallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
