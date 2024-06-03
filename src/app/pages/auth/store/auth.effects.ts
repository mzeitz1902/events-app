import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  logIn,
  loginOrSignupFail,
  logInSuccess,
  logout,
  signUp,
  signUpSuccess,
} from './auth.actions';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { PATH_AUTH, PATH_EVENTS } from '../../../app.routes';
import { FirebaseError } from '@angular/fire/app';
import { AuthErrorCode } from '@firebase/auth/dist/esm5/src/core/errors';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap((action) => {
        return this.authService.register$(action.user).pipe(
          map(() => {
            this.router.navigate([PATH_EVENTS]);
            return signUpSuccess();
          }),
          catchError((err) => {
            return of(loginOrSignupFail({ error: err }));
          }),
        );
      }),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logIn),
      switchMap((action) => {
        return this.authService.login$(action.user).pipe(
          map(() => {
            this.router.navigate([PATH_EVENTS]);
            return logInSuccess();
          }),
          catchError((err: FirebaseError) =>
            of(loginOrSignupFail({ error: err.code as AuthErrorCode })),
          ),
        );
      }),
    ),
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        switchMap(() => {
          return this.authService
            .handleLogout$()
            .pipe(map(() => this.router.navigate([PATH_AUTH])));
        }),
      );
    },
    { dispatch: false },
  );
}
