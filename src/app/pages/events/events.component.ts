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
  providers: [EventsService],
  template: `
    <div class="events-container p-10 items-center">
      @for (date of dates(); track date) {
        <div class="events-container items-center">
          <h2>{{ date | date }}</h2>
          @for (event of events().get(date); track event) {
            <app-music-event [event]="event"/>
          }
        </div>
      } @empty {
        <mat-spinner/>
      }
    </div>
  `
})
export class EventsComponent {
  service = inject(EventsService)
  events = this.service.musicEvents
  dates = this.service.dates
}
