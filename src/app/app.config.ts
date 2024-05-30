import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideRouterStore} from '@ngrx/router-store';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {environment} from "./environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {shoppingCartFeature} from "./pages/shopping-cart/store/shopping-cart.feature";
import {musicEventsFeature} from "./pages/events/store/music-events.feature";
import {MusicEventsEffects} from "./pages/events/store/music-events.effects";
import {ShoppingCartEffects} from "./pages/shopping-cart/store/shopping-cart.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStore({
      [musicEventsFeature.name]: musicEventsFeature.reducer,
      [shoppingCartFeature.name]: shoppingCartFeature.reducer
    }),
    provideEffects(MusicEventsEffects, ShoppingCartEffects),
    provideRouterStore(),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStoreDevtools(),
    importProvidersFrom(BrowserAnimationsModule),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
};
