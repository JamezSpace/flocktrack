import { inject, Provider } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { FIREBASE_APP, FIREBASE_AUTH } from './firebase.tokens';
import { flocktrackFirebaseConfig } from './firebase.config';

function provideFirebase(): Provider[] {
  return [
    {
      provide: FIREBASE_APP,
      useFactory: () => initializeApp(flocktrackFirebaseConfig)
    },
    {
      provide: FIREBASE_AUTH,
      useFactory: () => getAuth(inject(FIREBASE_APP))
    }
  ];
}

export { provideFirebase };