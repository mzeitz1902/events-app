import { Component, computed, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [MatTooltip],
  template: ` <div
    class="rounded-full w-7 h-7 text-sm flex items-center justify-center bg-primary-30"
    [matTooltip]="name()"
  >
    {{ initials() }}
  </div>`,
})
export class UserAvatarComponent {
  name = input.required<string>();
  initials = computed(() => {
    return this.name()
      .split(' ')
      .map((n) => {
        return n[0]?.toUpperCase();
      })
      .join('');
  });
}
