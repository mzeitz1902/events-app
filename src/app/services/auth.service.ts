import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
  UserInfo
} from "@angular/fire/auth";
import {firstValueFrom, from} from "rxjs";
import {UserCredentials} from "../pages/auth/auth.component";
import {Store} from "@ngrx/store";
import {loginSuccess, logout} from "../pages/auth/store/auth.actions";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private readonly store: Store = inject(Store)
  private readonly user$ = user(this.firebaseAuth)

  currentUserSig = toSignal(this.user$)

  constructor() {
    this.getCurrentUser()
  }

  register$({email, username, password}: UserCredentials) {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((userCredential) => updateProfile(userCredential.user, {displayName: username}))
    return from(promise)
  }

  login$({email, password}: UserCredentials) {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password))
  }

  logout() {
    this.store.dispatch(logout())
  }

  handleLogout$() {
    return from(this.firebaseAuth.signOut())
  }

  currentUser() {
    return firstValueFrom(this.user$)
  }

  private getCurrentUser() {
    this.user$.subscribe((user) => {
      if (user) {
        const _user = {
          displayName: user.displayName,
          email: user.email,
        } as UserInfo
        this.store.dispatch(loginSuccess({user: _user}));
      }
    })
  }
}
