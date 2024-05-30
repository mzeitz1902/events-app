import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgClass} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {login, register, resetError} from "./store/auth.actions";
import {User} from "./user.interface";


@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    MatFormField,
    MatInput,
    MatError,
    AsyncPipe,
    MatButton,
    MatLabel
  ],
  template: `
    <div class="container">
      <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
        <div [ngClass]="getContentClass()">
          <h1>Welcome to Events App</h1>
          <mat-form-field>
            <mat-label>E-Mail</mat-label>
            <input
              matInput
              placeholder="max@mustermann.com"
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

          @if (!isLoginMode) {
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

          <div class="button-wrapper">
            <button
              mat-raised-button
              color="accent"
              class="button-with-margin"
              type="reset"
              [disabled]="!form.valid"
              (click)="onSubmit(form)"
            >
              {{ isLoginMode ? "Login" : "Register" }}
            </button>
            <button
              mat-raised-button
              color="accent"
              class="button-with-margin"
              (click)="switchLoginMode(form)"
              type="button">
              {{ isLoginMode ? "Switch to Signup" : "Switch to Login" }}
            </button>
          </div>
        </div>
      </form>

    </div>

  `
})
export class AuthComponent {
  isLoginMode: boolean = false;
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

  ngOnInit(): void {
    this.initForm();
    this.signedUp$.subscribe((value) => {
      if (value) {
        this.isLoginMode = true;
      }
    });
  }

  initForm() {
    const formObject = {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      username: [null, this.isLoginMode ? null : Validators.required],
    }
    this.form = this.formBuilder.group<UserForm>(formObject as unknown as UserForm);
  }

  getContentClass() {
    return this.isLoginMode ? 'content' : 'content-long';
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
    this.isLoginMode = !this.isLoginMode;
    this.store.dispatch(resetError());
    this.resetForm(form);
  }

  resetForm(form: FormGroup) {
    form.reset();
    this.initForm();
  }

  onSubmit(form: FormGroup) {
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.name;
    const user: User = {email, password, username};
    if (this.isLoginMode) {
      this.store.dispatch(login({user}));
    } else {
      this.store.dispatch(register({user: form.value}));
    }
    this.resetForm(form);
  }
}

enum Error {
  WRONG_PASSWORD = "Wrong Password",
  EMAIL_EXISTS = "E-Mail already exists",
  EMAIL_NOT_FOUND = "E-Mail not found"
}

interface UserForm {
  email: AbstractControl<string>;
  password: AbstractControl<string>;
  username: AbstractControl<string>;
}
