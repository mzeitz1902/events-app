import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import {
  loadMusicEvents,
  loadMusicEventsSuccess,
} from './music-events.actions';
import { FirestoreService } from '../../../services/firestore.service';

@Injectable()
export class MusicEventsEffects {
  private actions$ = inject(Actions);
  private firebaseService = inject(FirestoreService);

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMusicEvents),
      switchMap((_) =>
        this.firebaseService
          .getEvents$()
          .pipe(map((musicEvents) => loadMusicEventsSuccess({ musicEvents }))),
      ),
    ),
  );
}
