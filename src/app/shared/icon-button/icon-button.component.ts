import {Component, input} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon
  ],
  template: `
    <button mat-icon-button [color]="color()">
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
  `
})
export class IconButtonComponent {
  icon = input.required<string>()
  color = input<'primary' | 'accent'>('primary')
}
