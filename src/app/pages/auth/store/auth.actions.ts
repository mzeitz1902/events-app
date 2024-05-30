import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../user.interface";


const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ user: User }>(),
    loginSuccess: props<{ user: User }>(),
    loginOrSignupFail: props<{ error: string }>(),
    register: props<{ user: User }>(),
    registerSuccess: emptyProps(),
    resetError: emptyProps()
  }
});

export const login = AuthActions.login;
export const loginSuccess = AuthActions.loginSuccess;
export const loginOrSignupFail = AuthActions.loginOrSignupFail;
export const register = AuthActions.register;
export const registerSuccess = AuthActions.registerSuccess;
export const resetError = AuthActions.resetError;
