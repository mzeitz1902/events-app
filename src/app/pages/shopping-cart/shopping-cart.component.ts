import {Component, inject} from '@angular/core';
import {ShoppingCartComponentService} from "./shopping-cart-component.service";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  template: ``
})
export class ShoppingCartComponent {
  service = inject(ShoppingCartComponentService)

}
