import {
  addDoc,
  collection,
  collectionData,
  docData,
  DocumentReference,
  Firestore,
  Timestamp
} from '@angular/fire/firestore';
import {forkJoin, from, map, Observable, switchMap, take} from 'rxjs';
import {inject, Injectable} from '@angular/core';

export interface Venue {
  id: string
  name: string
  contentUrl: string
  live: boolean
  direction?: string
}

interface Artist {
  id: string
  name: string
}

export interface MusicEvent {
  id: string
  title: string
  flyerFront: string
  attending: number
  startDatetime: Timestamp
  endDatetime: Timestamp
  contentUrl: string
  venue: Venue | DocumentReference
  artists: Artist[] | DocumentReference[]
  city: string
  country: string
  private: boolean
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore);
  eventsCollection = collection(this.firestore, 'music-events');

  /**
   * Fetches all music events from the Firestore collection and resolves the artists for each event.
   *
   * This method returns an Observable that emits an array of MusicEvent objects. Each MusicEvent object includes an array of Artist objects.
   * The MusicEvent objects are fetched from Firestore using the `collectionData` function from `@angular/fire/firestore`.
   * The `switchMap` operator is used to replace each event's `artists` field with an Observable of the resolved artists data.
   * The `forkJoin` operator is used to wait for all Artist Observables to complete before emitting the array of MusicEvent objects.
   *
   */
  getEvents$(): Observable<MusicEvent[]> {
    return collectionData(this.eventsCollection, {idField: 'id'}).pipe(
      switchMap(events =>
        forkJoin(
          events.map(event =>
            forkJoin({
              artists: this.getArtists$(event as MusicEvent),
              venue: this.getVenue$(event as MusicEvent)
            }).pipe(
              map(({artists, venue}) => ({...event, artists, venue} as MusicEvent))
            )
          )
        )
      )
    )
  }

  addEventToCart(eventId: string) {
    // todo works but duplicates are not prevented
    return from(addDoc(collection(this.firestore, 'shopping-cart'), {eventId}))

  }

  /**
   * Gets the artists for a given music event.
   *
   * This method takes a MusicEvent object as input and returns an Observable that emits an array of Artist objects.
   * The Artist objects are fetched from Firestore using their DocumentReference in the MusicEvent object.
   * The `forkJoin` operator is used to wait for all Artist Observables to complete before emitting the array of Artist objects.
   *
   */
  private getArtists$(event: MusicEvent) {
    return forkJoin(
      event.artists.map(artistRef =>
        docData(artistRef as DocumentReference).pipe(
          take(1),
          map(artist => artist as Artist)
        )
      )
    );
  }

  private getVenue$(event: MusicEvent) {
    return docData(event.venue as DocumentReference).pipe(
      take(1),
      map(venue => venue as Venue)
    )
  }
}
