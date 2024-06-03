import { Component, inject } from '@angular/core';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IconButtonComponent } from './shared/icon-button/icon-button.component';
import { PATH_SHOPPING_CART } from './app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPrefix,
    MatToolbar,
    RouterLink,
    IconButtonComponent,
  ],
  template: `
    @if (currentUser()) {
      <mat-toolbar class="flex justify-between !p-8 sticky top-0 z-10">
        <mat-form-field class="mt-4 !text-sm">
          <p class="flex items-center gap-2">
            <mat-icon matPrefix class="!text-md">search</mat-icon>
            <input type="text" matInput placeholder="Search..." />
          </p>
        </mat-form-field>
        <p>Welcome {{ currentUser()?.displayName }}</p>
        <!--        <p>Welcome {{ (user$ | async)?.name }}</p>-->
        <!--                <mat-icon-->
        <!--                  [matBadge]="eventsInCart$ | async"-->
        <!--                  [routerLink]="'/shopping-cart'"-->
        <!--                >shopping_cart-->
        <!--                </mat-icon>-->
        <app-icon-button
          color="primary"
          icon="shopping_cart"
          [routerLink]="PATH_SHOPPING_CART"
        />
        <app-icon-button color="primary" icon="logout" (click)="logout()" />
      </mat-toolbar>
    }
  `,
})
export class AppHeaderComponent {
  private readonly service = inject(AuthService);
  currentUser = this.service.currentUserSig;

  logout() {
    this.service.logout();
  }

  protected readonly PATH_SHOPPING_CART = PATH_SHOPPING_CART;
}
