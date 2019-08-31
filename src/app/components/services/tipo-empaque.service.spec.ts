import { TestBed } from '@angular/core/testing';

import { TipoEmpaqueService } from './tipo-empaque.service';

describe('TipoEmpaqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoEmpaqueService = TestBed.get(TipoEmpaqueService);
    expect(service).toBeTruthy();
  });
});
