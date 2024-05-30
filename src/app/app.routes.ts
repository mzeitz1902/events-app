import {Routes} from '@angular/router';
import {provideState} from "@ngrx/store";
import {reducer, shoppingCartFeatureKey} from "./pages/shopping-cart/store/shopping-cart.feature";
import {authFeature} from "./pages/auth/store/auth.feature";
import {provideEffects} from "@ngrx/effects";
import {AuthEffects} from "./pages/auth/store/auth.effects";

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
    providers: []

  },
  {
    path: 'shopping-cart',
    loadComponent: () => import('./pages/shopping-cart/shopping-cart.component').then(m => m.ShoppingCartComponent),
    providers: [
      provideState(shoppingCartFeatureKey, reducer)
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
    providers: [provideState(authFeature.name, authFeature.reducer), provideEffects(AuthEffects)]
  }
];
