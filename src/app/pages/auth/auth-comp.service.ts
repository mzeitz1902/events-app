import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { logIn, resetError, signUp } from './store/auth.actions';
import { AuthService } from '../../services/auth.service';
import {
  ControlEvent,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserForm } from './auth.component';
import { UserCredentials } from '../../shared/user-credentials.interface.';
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

  emailError = computed(() => {
    const errors = this.emailEvents()?.source?.errors as FormError;
    if (errors?.email) return 'Not a valid email address.';
    if (errors?.required) return 'You must enter a value.';
    return 'Unknown error.';
  });
  passwordError = computed(() => {
    const errors = this.passwordEvents()?.source?.errors as FormError;
    if (errors?.required) return 'You must enter a value.';
    if (errors?.minlength) return 'You must enter at least 6 characters.';
    return 'Unknown error.';
  });
  private form: FormGroup<UserForm> | undefined;

  initForm(isLoginMode: boolean) {
    const formObject = {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      username: [null, isLoginMode ? null : Validators.required],
    };
    this.form = this.formBuilder.group<UserForm>(
      formObject as unknown as UserForm,
    );
    const emailEvents = this.form.get('email')?.events || EMPTY;
    this.emailEvents = toSignal(emailEvents);
    return this.form;
  }

  onSubmit(user: UserCredentials, isLoginMode: boolean) {
    const action = isLoginMode ? logIn : signUp;
    this.store.dispatch(action({ user }));
  }

  resetError() {
    this.store.dispatch(resetError());
  }
}
