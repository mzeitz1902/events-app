import { Component, computed, inject, input } from '@angular/core';
import { MusicEvent, Venue } from '../../../services/firestore.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatCardXlImage,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { VenueComponent } from './venue.component';
import { EventDateComponent } from './event-date.component';
import { EventsService } from '../events.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-music-event',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    VenueComponent,
    MatCardXlImage,
    EventDateComponent,
    MatCardActions,
    MatIcon,
    MatButton,
  ],
  template: `
    <mat-card class="w-max flex flex-col gap-2">
      <mat-card-header>
        <mat-card-title class="!font-bold">{{ event().title }}</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <img mat-card-xl-image [src]="event().flyerFront" alt="flyer" />
        <app-venue [venue]="venue()" />
        <app-event-date
          [startDateTime]="event().startDatetime"
          [endDateTime]="event().endDatetime"
        />

        <mat-card-actions class="flex justify-center">
          <button mat-stroked-button (click)="onClick()">
            <mat-icon class="material-symbols-outlined">add_circle</mat-icon>
            Add to cart
          </button>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>
  `,
})
export class MusicEventComponent {
  event = input.required<MusicEvent>();
  venue = computed<Venue>(() => this.event().venue as Venue);

  service = inject(EventsService);

  onClick() {
    this.service.addEventToCart(this.event().id);
  }
}
