import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppHeaderComponent, RouterOutlet],
  template: `
    <app-header />
    <div class="mat-app-background h-screen">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {}
