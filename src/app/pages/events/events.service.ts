import {computed, inject, Injectable} from '@angular/core';
import {MusicEvent} from "../../services/firestore.service";
import {Store} from "@ngrx/store";
import {selectIsLoading, selectMusicEvents} from "./store/music-events.feature";
import {loadMusicEvents} from "./store/music-events.actions";
import {addToCart} from "../shopping-cart/store/shopping-cart.actions";

@Injectable({providedIn: 'root'})
export class EventsService {
  private readonly store: Store = inject(Store)

  private events = this.store.selectSignal(selectMusicEvents)

  /** Returns events grouped by date */
  musicEvents = computed(() => {
    const events = this.events()
    const groupedEvents = new Map<string, MusicEvent[]>()
    if (events) {
      events.forEach(event => {
        const date = event.startDatetime.toDate().toString()
        groupedEvents.set(date, [event])
      })
    }
    return groupedEvents
  })
  dates = computed(() => Array.from(this.musicEvents().keys()))

  isLoading = this.store.selectSignal(selectIsLoading)

  constructor() {
    this.loadEvents()
  }

  loadEvents() {
    this.store.dispatch(loadMusicEvents())
  }

  addEventToCart(id: string) {
    this.store.dispatch(addToCart({id}))
  }
}
