import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {MusicEvent} from "../../../services/firestore.service";
import {loadMusicEvents, loadMusicEventsSuccess} from "./music-events.actions";

export const musicEventsFeatureKey = 'musicEvents';

export interface State extends EntityState<MusicEvent> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<MusicEvent> = createEntityAdapter<MusicEvent>();

export const initialState: State = adapter.getInitialState({isLoading: false});

export const reducer = createReducer(
  initialState,
  on(loadMusicEvents, state => ({...state, isLoading: true})),
  on(loadMusicEventsSuccess,
    (state, action) => adapter.setAll(action.musicEvents, {...state, isLoading: false})
  ),
);

export const musicEventsFeature = createFeature({
  name: musicEventsFeatureKey,
  reducer,
  extraSelectors: ({selectMusicEventsState}) => ({
    ...adapter.getSelectors(selectMusicEventsState),
    selectIsLoading: createSelector(selectMusicEventsState, state => state.isLoading),
  }),
});

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = musicEventsFeature;

export const selectMusicEvents = selectAll;
export const selectIsLoading = musicEventsFeature.selectIsLoading;
