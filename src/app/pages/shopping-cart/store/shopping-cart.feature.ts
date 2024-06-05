import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { loadMusicEvents } from '../../events/store/music-events.actions';
import {
  addToCart,
  addToCartSuccess,
  removeFromCart,
  removeFromCartSuccess,
} from './shopping-cart.actions';
import { MusicEvent } from '../../../services/firestore.service';

export const shoppingCartFeatureKey = 'shoppingCart';

export interface State extends EntityState<Partial<MusicEvent>> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<Partial<MusicEvent>> =
  createEntityAdapter<Partial<MusicEvent>>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
});

export const reducer = createReducer(
  initialState,
  on(loadMusicEvents, (state) => ({ ...state, isLoading: true })),
  on(addToCart, (state) => ({ ...state, isLoading: true })),
  on(addToCartSuccess, (state, action) => {
    if (state.entities[action.event.id!]) {
      return state;
    }
    return adapter.addOne(
      { id: action.event.id, title: action.event.title },
      state,
    );
  }),
  on(removeFromCart, (state) => ({ ...state, isLoading: true })),
  on(removeFromCartSuccess, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
);

export const shoppingCartFeature = createFeature({
  name: shoppingCartFeatureKey,
  reducer,
  extraSelectors: ({ selectShoppingCartState }) => ({
    ...adapter.getSelectors(selectShoppingCartState),
    selectIsLoading: createSelector(
      selectShoppingCartState,
      (state) => state.isLoading,
    ),
  }),
});
