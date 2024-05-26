import {Component} from '@angular/core';
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";

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
    <mat-toolbar class="flex justify-between !p-8">
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
  `
})
export class AppHeaderComponent {

}
