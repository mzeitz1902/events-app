import { Component, computed, inject, input } from '@angular/core';
import { MusicEvent, Venue } from '../../../services/firestore.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardXlImage,
} from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { VenueComponent } from './venue.component';
import { EventDateComponent } from './event-date.component';
import { MatSuffix } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-music-event',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardXlImage,
    MatCardHeader,
    MatCardContent,
    MatIconButton,
    MatIcon,
    VenueComponent,
    EventDateComponent,
    MatCardActions,
    MatSuffix,
    MatTooltip,
  ],
  template: `
    <mat-card class="max-w-sm flex flex-col gap-2">
      <mat-card-header>
        <mat-card-title class="!font-bold !text-black">{{
          event().title
        }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <img mat-card-xl-image [src]="event().flyerFront" alt="flyer" />
        <app-venue [venue]="venue()" />
        <app-event-date
          [startDateTime]="event().startDatetime"
          [endDateTime]="event().endDatetime"
        />
        <mat-card-actions class="flex justify-end">
          <button mat-icon-button matTooltip="Add to cart" (click)="onClick()">
            <mat-icon color="primary">add_circle</mat-icon>
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
