import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {AuthErrorCode} from "@firebase/auth/dist/esm5/src/core/errors";
import {UserCredentials} from "../../../shared/user-credentials.interface.";


const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ user: UserCredentials }>(),
    loginSuccess: emptyProps(),
    loginOrSignupFail: props<{ error: AuthErrorCode }>(),
    signUp: props<{ user: UserCredentials }>(),
    signUpSuccess: emptyProps(),
    resetError: emptyProps(),
    logout: emptyProps()
  }
});

export const logIn = AuthActions.login;
export const logInSuccess = AuthActions.loginSuccess;
export const loginOrSignupFail = AuthActions.loginOrSignupFail;
export const signUp = AuthActions.signUp;
export const signUpSuccess = AuthActions.signUpSuccess;
export const resetError = AuthActions.resetError;
export const logout = AuthActions.logout;
