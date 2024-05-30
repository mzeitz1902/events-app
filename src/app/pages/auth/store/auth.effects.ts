import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from "rxjs";
import {register, registerSuccess} from "./auth.actions";
import {AuthService} from "../../../services/auth.service";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions)
  authService = inject(AuthService)

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(register),
        switchMap((action) => {
          return this.authService.register$(action.user).pipe(
            map(() => registerSuccess())
          );
        })
      )
  );

}
