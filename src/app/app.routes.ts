import {Routes} from '@angular/router';
import {provideState} from "@ngrx/store";
import {reducer, shoppingCartFeatureKey} from "./pages/shopping-cart/store/shopping-cart.feature";
import {authGuard} from "./authGuard";

export const PATH_EVENTS = 'events';
export const PATH_SHOPPING_CART = 'shopping-cart';
export const PATH_AUTH = 'auth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth', // todo redirect to events when already logged in
    pathMatch: 'full'
  },
  // todo authguard
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent),
    providers: [],
    canActivate: [authGuard]
  },
  {
    path: 'shopping-cart',
    loadComponent: () => import('./pages/shopping-cart/shopping-cart.component').then(m => m.ShoppingCartComponent),
    providers: [
      provideState(shoppingCartFeatureKey, reducer)
    ],
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
    canActivate: [authGuard]
  }
];
