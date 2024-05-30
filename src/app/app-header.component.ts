import {Component, inject} from '@angular/core';
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {AuthService} from "./services/auth.service";

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
    RouterLink
  ],
  template: `
    @if (currentUser()) {
      <mat-toolbar class="flex justify-between !p-8 sticky top-0 z-10">
        <button mat-icon-button color="accent" (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
        <mat-form-field class="mt-4 !text-sm">
          <p class="flex items-center gap-2">
            <mat-icon matPrefix class="!text-md">search</mat-icon>
            <input
              type="text"
              matInput
              placeholder="Search...">
          </p>
        </mat-form-field>
        <!--      <p>Welcome {{(user$ | async)?.name}}</p>-->
        <button mat-icon-button color="accent">
          <mat-icon [routerLink]="'/shopping-cart'">shopping_cart</mat-icon>
          <!--                <mat-icon-->
          <!--                  [matBadge]="eventsInCart$ | async"-->
          <!--                  [routerLink]="'/shopping-cart'"-->
          <!--                >shopping_cart-->
          <!--                </mat-icon>-->
        </button>
      </mat-toolbar>
    }
  `
})
export class AppHeaderComponent {
  private readonly service = inject(AuthService)
  currentUser = this.service.currentUserSig

  logout() {
    this.service.logout()
  }
}
