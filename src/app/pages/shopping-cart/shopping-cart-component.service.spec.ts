import { TestBed } from '@angular/core/testing';

import { ShoppingCartComponentService } from './shopping-cart-component.service';

describe('ShoppingCartComponentService', () => {
  let service: ShoppingCartComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
