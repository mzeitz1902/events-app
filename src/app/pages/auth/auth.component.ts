import { Component, effect, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthCompService } from './auth-comp.service';

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
  providers: [AuthCompService],
  template: `
    <div class="flex flex-col items-center gap-5 p-2">
      <h1 class="font-bold text-2xl">Welcome to Events App</h1>
      @if (form) {
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit(form)"
          class="flex flex-col max-w-fit"
        >
          <mat-form-field [class.mb-3]="emailError()">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" />
            @if (emailError()) {
              <mat-error>{{ emailError() }}</mat-error>
            }
          </mat-form-field>

          <mat-form-field [class.mb-5]="passwordError()">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" />
            @if (passwordError()) {
              <mat-error>{{ passwordError() }}</mat-error>
            }
          </mat-form-field>

          @if (mode() === 'Signup') {
            <mat-form-field>
              <mat-label>Name</mat-label>
              <input matInput formControlName="username" />
              @if (form.controls['username'].errors) {
                <mat-error>{{ getErrorName(form) }}</mat-error>
              }
            </mat-form-field>
          }

          <div class="flex flex-col gap-3 items-center justify-center">
            @if (authError()) {
              <mat-error>{{ authError() }}</mat-error>
            }
            @if (mode() === 'Login') {
              <button
                mat-stroked-button
                color="primary"
                [disabled]="this.mode() === 'Signup' || form.invalid"
              >
                Log In
              </button>
              <p class="underline cursor-pointer" (click)="mode.set('Signup')">
                No account yet?
              </p>
            }
            @if (mode() === 'Signup') {
              <button
                mat-raised-button
                color="primary"
                (click)="mode.set('Signup')"
                [disabled]="this.mode() === 'Signup' && !this.form.valid"
              >
                Sign Up
              </button>
            }
          </div>
        </form>
      }
    </div>
  `,
})
export class AuthComponent {
  mode = signal<'Login' | 'Signup'>('Login');

  private readonly service = inject(AuthCompService);
  authError = this.service.authError;
  emailError = this.service.emailError;
  passwordError = this.service.passwordError;
  form!: FormGroup<UserForm>;

  constructor() {
    this.initForm();
    effect(() => {
      if (this.mode() === 'Signup') {
        this.service.resetError();
      }
    });
  }

  initForm() {
    this.form = this.service.initForm(this.mode() === 'Login');
  }

  getErrorName(form: FormGroup) {
    if (form.controls['username'].hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  onSubmit(form: FormGroup) {
    this.service.onSubmit(form.value, this.mode() === 'Login');
  }
}

export interface UserForm {
  email: AbstractControl<string | null>;
  password: AbstractControl<string | null>;
  username: AbstractControl<string | null>;
}
