import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from "rxjs";
import {login, logout, register, registerSuccess} from "./auth.actions";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {PATH_AUTH, PATH_EVENTS} from "../../../app.routes";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions)
  authService = inject(AuthService)
  router = inject(Router)

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(register),
        switchMap((action) => {
          return this.authService.register$(action.user).pipe(
            map(() => {
              this.router.navigate([PATH_EVENTS]);
              return registerSuccess();
            })
          );
        })
      )
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        switchMap((action) => {
          return this.authService.login$(action.user).pipe(
            map((userCredential) => {
              this.router.navigate([PATH_EVENTS]);
            })
          );
        })
      ), {dispatch: false}
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        switchMap(() => {
          return this.authService.handleLogout$().pipe(
            map(() => this.router.navigate([PATH_AUTH]))
          );
        })
      );
    }, {dispatch: false}
  );

}
