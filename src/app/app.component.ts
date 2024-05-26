import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from "./app-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppHeaderComponent,
    RouterOutlet
  ],
  template: `
    <app-header/>
    <router-outlet/>
  `,
})
export class AppComponent {

  // async ngOnInit() {
  //   const events = await this.service.getEvents()
  //   debugger
  //   console.log(events)
  // }

}
