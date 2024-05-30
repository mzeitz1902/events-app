import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {MusicEvent} from "../../../services/firestore.service";


const MusicEventsActions = createActionGroup({
  source: 'MusicEvents',
  events: {
    loadMusicEvents: emptyProps(),
    loadMusicEventsSuccess: props<{ musicEvents: MusicEvent[] }>(),
  }
});

export const loadMusicEvents = MusicEventsActions.loadMusicEvents
export const loadMusicEventsSuccess = MusicEventsActions.loadMusicEventsSuccess
