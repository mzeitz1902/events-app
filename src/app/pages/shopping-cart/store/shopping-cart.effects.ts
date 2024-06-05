import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirestoreService } from '../../../services/firestore.service';
import { addToCart, addToCartSuccess } from './shopping-cart.actions';
import { map, switchMap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selectEventById } from '../../events/store/music-events.feature';

@Injectable()
export class ShoppingCartEffects {
  private readonly actions$ = inject(Actions);
  private readonly firebaseService = inject(FirestoreService);
  private readonly store: Store = inject(Store);

  addEventToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      concatLatestFrom((action) =>
        this.store.select(selectEventById(action.id)),
      ),
      switchMap(([action, event]) => {
        return this.firebaseService.addEventToCart(action.id).pipe(
          map(() =>
            addToCartSuccess({
              event: { id: action.id, title: event!.title },
            }),
          ),
        );
      }),
    ),
  );
}
