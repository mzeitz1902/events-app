import { Component, inject } from '@angular/core';
import { EventsService } from './events.service';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MusicEventComponent } from './music-event/music-event.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    MatButton,
    DatePipe,
    MusicEventComponent,
    MatProgressSpinner,
    MatDivider,
  ],
  template: `
    <div class="events-container p-10">
      <h1 class="text-2xl">Public Events</h1>
      @if (isLoading()) {
        <mat-spinner />
      }
      @for (date of dates(); track date) {
        <div class="events-container rounded-lg bg-primary-30 p-5 max-w-min">
          <h1 class="font-extrabold primary !sticky top-[65px] z-10 rounded-lg">
            {{ date | date }}
          </h1>
          <div class="flex gap-3">
            @for (event of events().get(date); track event.id) {
              @defer {
                <app-music-event [event]="event" />
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class EventsComponent {
  service = inject(EventsService);
  events = this.service.musicEvents;
  dates = this.service.dates;
  isLoading = this.service.isLoading;
}
