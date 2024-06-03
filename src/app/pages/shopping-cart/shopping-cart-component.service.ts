import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartComponentService {
  private readonly store: Store = inject(Store);

  // events = this.store.selectSignal(selectMusicEventsInCart)

  constructor() {}
}
