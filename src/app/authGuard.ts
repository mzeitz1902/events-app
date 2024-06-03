import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {inject} from "@angular/core";
import {PATH_AUTH, PATH_EVENTS} from "./app.routes";

export const authGuard: CanActivateFn = async (_, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  // doesn't work with signal, only with promise
  const hasUser = await authService.currentUser();
  if (state.url.includes(PATH_AUTH) && hasUser) {
    await router.navigate([PATH_EVENTS])
    return true
  }
  if (state.url.includes(PATH_EVENTS)) {
    if (!hasUser) {
      await router.navigate([PATH_AUTH])
      return false
    }
  }
  return true
};
