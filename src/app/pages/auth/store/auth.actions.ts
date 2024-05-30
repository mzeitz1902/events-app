import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserInfo} from '@angular/fire/auth';
import {UserCredentials} from "../auth.component";


const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ user: UserCredentials }>(),
    loginSuccess: props<{ user: UserInfo }>(),
    loginOrSignupFail: props<{ error: string }>(),
    register: props<{ user: UserCredentials }>(),
    registerSuccess: emptyProps(),
    resetError: emptyProps(),
    logout: emptyProps()
  }
});

export const login = AuthActions.login;
export const loginSuccess = AuthActions.loginSuccess;
export const loginOrSignupFail = AuthActions.loginOrSignupFail;
export const register = AuthActions.register;
export const registerSuccess = AuthActions.registerSuccess;
export const resetError = AuthActions.resetError;
export const logout = AuthActions.logout;
