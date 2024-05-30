import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FirestoreService} from "../../../services/firestore.service";
import {addToCart, addToCartSuccess} from "./shopping-cart.actions";
import {map, switchMap} from "rxjs";

@Injectable()
export class ShoppingCartEffects {
  private readonly actions$ = inject(Actions)
  private readonly firebaseService = inject(FirestoreService)

  addEventToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCart),
        switchMap((action) => {
          return this.firebaseService.addEventToCart(action.id).pipe(
            map(() => addToCartSuccess({id: action.id})))
        })
      )
  );
}
