import {createFeature, createReducer} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {User} from "../user.interface";

export const authsFeatureKey = 'auths';

export interface State extends EntityState<User> {
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
);

export const authFeature = createFeature({
  name: authsFeatureKey,
  reducer,
  extraSelectors: ({selectAuthsState}) => ({
    ...adapter.getSelectors(selectAuthsState)
  }),
});
