import { Component, computed, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatTooltip],
  template: `
    <button mat-icon-button [class]="mappedColor()" [matTooltip]="tooltip()">
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
  `,
})
export class IconButtonComponent {
  icon = input.required<string>();
  color = input<'primary' | 'primary-darker' | 'accent'>('primary');
  tooltip = input<string>('');

  protected readonly mappedColor = computed(() => {
    switch (this.color()) {
      case 'primary':
        return 'primary';
      case 'primary-darker':
        return 'primary-30';
      case 'accent':
        return 'text-accent-500';
    }
  });
}
