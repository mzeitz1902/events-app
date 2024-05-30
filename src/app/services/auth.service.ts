import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, updateProfile} from "@angular/fire/auth";
import {User} from "../pages/auth/user.interface";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);

  register$({email, username, password}: User) {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((userCredential) => updateProfile(userCredential.user, {displayName: username}))
    return from(promise)
  }
}
