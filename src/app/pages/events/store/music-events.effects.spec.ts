import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MusicEventsEffects } from './music-events.effects';

describe('MusicEventsEffects', () => {
  let actions$: Observable<any>;
  let effects: MusicEventsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MusicEventsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MusicEventsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
