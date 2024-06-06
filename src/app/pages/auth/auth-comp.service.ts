import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { logIn, resetError, signUp } from './store/auth.actions';
import { AuthService } from '../../services/auth.service';
import {
  ControlEvent,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserForm } from './auth.component';
import { UserCredentials } from '../../shared/user-credentials.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY } from 'rxjs';

interface FormError {
  email?: boolean;
  required?: boolean;
  minlength?: boolean;
}

@Injectable()
export class AuthCompService {
  private readonly store: Store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);
  private readonly service = inject(AuthService);
  authError = this.service.mappedError;

  emailEvents: Signal<ControlEvent<string | undefined> | undefined> =
    signal(undefined);
  passwordEvents: Signal<ControlEvent<string | undefined> | undefined> =
    signal(undefined);
  usernameEvents: Signal<ControlEvent<string | undefined> | undefined> =
    signal(undefined);

  emailError = computed(() => {
    const errors = this.emailEvents()?.source?.errors as FormError;
    if (errors?.email) return 'Not a valid email address.';
    if (errors?.required) return 'You must enter a value.';
    return '';
  });

  passwordError = computed(() => {
    const errors = this.passwordEvents()?.source?.errors as FormError;
    if (errors?.required) return 'You must enter a value.';
    if (errors?.minlength) return 'You must enter at least 6 characters.';
    return '';
  });

  private form: FormGroup<UserForm> | undefined;

  initForm(isLoginMode: boolean) {
    const formObject = this.buildFormObject(isLoginMode);
    this.form = this.formBuilder.group<UserForm>(formObject);
    this.buildSignals();
    return this.form;
  }

  private buildFormObject(isLoginMode: boolean): UserForm {
    return {
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      username: new FormControl<string>(
        '',
        isLoginMode ? null : Validators.required,
      ),
    };
  }

  private buildSignals() {
    const emailEvents = this.form?.get('email')?.events || EMPTY;
    const passwordEvents = this.form?.get('password')?.events || EMPTY;
    const usernameEvents = this.form?.get('username')?.events || EMPTY;
    this.emailEvents = toSignal(emailEvents);
    this.passwordEvents = toSignal(passwordEvents);
    this.usernameEvents = toSignal(usernameEvents);
  }

  onSubmit(user: UserCredentials, isLoginMode: boolean) {
    const action = isLoginMode ? logIn : signUp;
    this.store.dispatch(action({ user }));
  }

  resetError() {
    this.store.dispatch(resetError());
  }
}
