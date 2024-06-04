import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { loginOrSignupFail, resetError } from './auth.actions';
import { AuthErrorCode } from '@firebase/auth/dist/esm5/src/core/errors';

export const authFeatureKey = 'auths';

export interface State {
  error: AuthErrorCode | null;
}

export const initialState: State = {
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(loginOrSignupFail, (state, action) => ({
    ...state,
    currentUser: null,
    error: action.error,
  })),
  on(resetError, (state) => ({ ...state, error: null })),
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
  extraSelectors: ({ selectAuthsState }) => ({
    selectError: createSelector(selectAuthsState, (state) => {
      if (!state.error) return null;
      return state.error.replace(/auth\//, '');
    }),
  }),
});

export const selectError = authFeature.selectError;
