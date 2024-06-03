import * as fromShoppingCart from './shopping-cart.feature';
import { selectShoppingCartState } from './shopping-cart.selectors';

describe('ShoppingCart Selectors', () => {
  it('should select the feature state', () => {
    const result = selectShoppingCartState({
      [fromShoppingCart.shoppingCartFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
