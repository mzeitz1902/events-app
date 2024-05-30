import {Component, inject} from '@angular/core';
import {EventsService} from "./events.service";
import {MatButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {MusicEventComponent} from "./music-event/music-event.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    MatButton,
    DatePipe,
    MusicEventComponent,
    MatProgressSpinner,
    MatDivider
  ],
  template: `
    <div class="events-container p-10 items-center">
      @if (isLoading()) {
        <mat-spinner/>
      }
      @for (date of dates(); track date) {
        <div class="events-container items-center rounded-lg bg-light-grey p-3">
          <h1
            class="font-extrabold text-blue-500 !sticky top-[65px] z-10 rounded-lg bg-light-grey">{{ date | date }}</h1>
          @for (event of events().get(date); track event) {
            <app-music-event [event]="event"/>
          }
        </div>
      }
    </div>
  `
})
export class EventsComponent {
  service = inject(EventsService)
  events = this.service.musicEvents
  dates = this.service.dates
  isLoading = this.service.isLoading
}
