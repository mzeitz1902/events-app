import { createActionGroup, props } from '@ngrx/store';
import { MusicEvent } from '../../../services/firestore.service';

const ShoppingCartActions = createActionGroup({
  source: 'Shopping Cart',
  events: {
    addToCart: props<{ id: string }>(),
    addToCartSuccess: props<{ event: Partial<MusicEvent> }>(),
    removeFromCart: props<{ id: string }>(),
    removeFromCartSuccess: props<{ id: string }>(),
  },
});

export const addToCart = ShoppingCartActions.addToCart;
export const addToCartSuccess = ShoppingCartActions.addToCartSuccess;
export const removeFromCart = ShoppingCartActions.removeFromCart;
export const removeFromCartSuccess = ShoppingCartActions.removeFromCartSuccess;
