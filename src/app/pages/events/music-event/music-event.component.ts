import {Component, computed, input} from '@angular/core';
import {MusicEvent, Venue} from "../../../services/firebase.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardXlImage} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-music-event',
  standalone: true,
  imports: [
    MatCard,
    MatCardSubtitle,
    MatCardXlImage,
    MatCardHeader,
    MatCardContent,
    MatIconButton,
    MatIcon
  ],
  template: `
    <mat-card class="max-w-sm">
      <mat-card-header>
        <mat-card-subtitle class="card-header">{{ event().title }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <img mat-card-xl-image [src]="event().flyerFront" alt="flyer">
        <button mat-icon-button (click)="onLocationClicked()" class="location-button">
          <mat-icon>location_on</mat-icon>
        </button>
      </mat-card-content>
    </mat-card>
  `
})
export class MusicEventComponent {
  event = input.required<MusicEvent>()

  venue = computed<Venue>(() => this.event().venue as Venue)

  onLocationClicked() {
    window.open(this.venue()?.direction, "_blank")
  }
}
