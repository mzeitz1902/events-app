import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ShoppingCartEffects } from './shopping-cart.effects';

describe('ShoppingCartEffects', () => {
  let actions$: Observable<any>;
  let effects: ShoppingCartEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ShoppingCartEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
