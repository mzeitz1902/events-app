import {Component, input} from '@angular/core';
import {Timestamp} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-event-date',
  standalone: true,
  imports: [
    DatePipe
  ],
  template: `
    <div class="flex flex-col">
      <div class="flex gap-1">
        <p class="font-bold">Starts:</p>
        <p>{{ startDateTime().toDate() | date: format }}</p>
      </div>

      <div class="flex gap-1">
        <p class="font-bold">Ends:</p>
        <p>{{ endDateTime().toDate() | date: format }}</p>
      </div>
    </div>
  `,
})
export class EventDateComponent {
  startDateTime = input.required<Timestamp>()
  endDateTime = input.required<Timestamp>()
  format = 'dd.MM.yyyy, HH:mm'
}
