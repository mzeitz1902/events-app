import { computed, inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { firstValueFrom, from } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from '../pages/auth/store/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectError } from '../pages/auth/store/auth.feature';
import { AuthErrorCode } from '@firebase/auth/dist/esm5/src/core/errors';
import { UserCredentials } from '../shared/user-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  private readonly store: Store = inject(Store);
  private authError = this.store.selectSignal(selectError);
  mappedError = computed(() => {
    switch (this.authError()) {
      case AuthErrorCode.INVALID_CREDENTIAL:
        return 'Invalid credentials';
      case AuthErrorCode.EMAIL_EXISTS:
        return 'Email already exists';
      default:
        return '';
    }
  });

  private readonly user$ = user(this.firebaseAuth);

  currentUserSig = toSignal(this.user$);

  register$({ email, username, password }: UserCredentials) {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((userCredential) =>
      updateProfile(userCredential.user, { displayName: username }),
    );
    return from(promise);
  }

  login$({ email, password }: UserCredentials) {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password));
  }

  logout() {
    this.store.dispatch(logout());
  }

  handleLogout$() {
    return from(this.firebaseAuth.signOut());
  }

  currentUser() {
    return firstValueFrom(this.user$);
  }
}
