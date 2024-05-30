import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {loginSuccess} from "./auth.actions";
import {UserInfo} from '@angular/fire/auth';

export const authFeatureKey = 'auths';

export interface State {
  currentUser: UserInfo | null
}

export const initialState: State = {
  currentUser: null
}

export const reducer = createReducer(
  initialState,
  on(loginSuccess, (state, {user}) => ({...state, currentUser: user}))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
  extraSelectors: ({selectAuthsState}) => ({
    selectCurrentUser: createSelector(selectAuthsState, state => state.currentUser)
  })
});

export const selectCurrentUser = authFeature.selectCurrentUser;
