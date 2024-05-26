import {computed, inject, Injectable} from '@angular/core';
import {FirebaseService, MusicEvent} from "../../services/firebase.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable()
export class EventsService {
  private firebaseService = inject(FirebaseService)

  private events = toSignal<MusicEvent[]>(this.firebaseService.getEvents$())

  dates = computed(() => {
    return this.events()?.map(event => event.startDatetime.toDate().toString())
  })

  /**Returns events grouped by date */
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


}
