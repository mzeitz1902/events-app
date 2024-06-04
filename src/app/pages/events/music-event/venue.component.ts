import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Venue } from '../../../services/firestore.service';
import { MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatPrefix, MatSuffix, MatTooltip],
  template: `
    <div
      class="flex items-center cursor-pointer"
      (click)="onLocationClicked()"
      matTooltip="Click to see location on Google Maps"
    >
      <button mat-icon-button>
        <mat-icon class="!text-sm mat-accent">location_on</mat-icon>
      </button>
      <p class="text-sm" matTextSuffix>{{ venue().name }}</p>
    </div>
  `,
})
export class VenueComponent {
  venue = input.required<Venue>();

  onLocationClicked() {
    window.open(this.venue()?.direction, '_blank');
  }
}
