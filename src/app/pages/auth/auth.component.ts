import {Component, inject, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {login, register, resetError} from "./store/auth.actions";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    AsyncPipe,
    MatButton,
    MatLabel,
  ],
  template: `
    <div class="flex flex-col items-center gap-5 p-2">
      <h1 class="font-bold text-2xl">Welcome to Events App</h1>
      <form [formGroup]="form" (ngSubmit)="onSubmit(form)" class="flex flex-col max-w-fit">
        <mat-form-field appearance="outline">
          <mat-label>E-Mail</mat-label>
          <input
            matInput
            formControlName="email"
          >
          @if (form.controls['email'].errors) {
            <mat-error>{{ getErrorMail(form) }}</mat-error>
          }
        </mat-form-field>

        <mat-form-field>
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            formControlName="password"
          >
          @if (form.controls['password'].errors) {
            <mat-error>{{ getErrorPassword(form) }}</mat-error>
          }
        </mat-form-field>

        @if (mode() === 'Register') {
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input
              matInput
              type="text"
              formControlName="username"
            >
            @if (form.controls['username'].errors) {
              <mat-error>{{ getErrorName(form) }}</mat-error>
            }
          </mat-form-field>
        }

        @if (errorState$ | async) {
          <mat-error class="error">{{ error$ | async }}</mat-error>
        }

        <div class="flex gap-3 items-center justify-center">
          <button
            mat-raised-button
            color="accent"
            (click)="onSubmit(form)"
          >
            {{ mode() === 'Login' ? 'Login' : 'Register' }}
          </button>
        </div>
      </form>

    </div>

  `
})
export class AuthComponent {
  private readonly service = inject(AuthService)
  mode = signal<'Login' | 'Register'>('Login')
  form: FormGroup<UserForm> = new FormGroup<UserForm>({} as UserForm);
  error$: Observable<Error | undefined> = new Observable<Error | undefined>();
  errorState$: Observable<boolean> = new Observable<boolean>();
  signedUp$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.initForm()
    // this.error$ = this.store.select(selectError);
    // this.errorState$ = this.store.select(selectErrorState);
    // this.signedUp$ = this.store.select(selectSignedUp);
  }

  initForm() {
    const formObject = {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      username: [null, this.mode() === 'Register' ? null : Validators.required],
    }
    this.form = this.formBuilder.group<UserForm>(formObject as unknown as UserForm);
  }

  getErrorMail(form: FormGroup) {
    if (form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getErrorName(form: FormGroup) {
    if (form.controls['username'].hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  getErrorPassword(form: FormGroup) {
    if (form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    if (form.controls['password'].errors?.['minlength']) {
      return 'You must enter at least 6 characters';
    }
    return;
  }

  switchLoginMode(form: FormGroup) {
    this.store.dispatch(resetError());
  }

  onSubmit(form: FormGroup) {
    const user = form.value
    const action = this.mode() === 'Login' ? login : register
    this.store.dispatch(action({user}));
  }
}

enum Error {
  WRONG_PASSWORD = "Wrong Password",
  EMAIL_EXISTS = "E-Mail already exists",
  EMAIL_NOT_FOUND = "E-Mail not found"
}

export interface UserForm {
  email: AbstractControl<string>;
  password: AbstractControl<string>;
  username: AbstractControl<string>;
}

export interface UserCredentials {
  email: string;
  password: string;
  username: string;
}
