import { InjectionToken } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';

const FIREBASE_APP = new InjectionToken<FirebaseApp>(
  'FIREBASE_APP'
);

const FIREBASE_AUTH = new InjectionToken<Auth>(
  'FIREBASE_AUTH'
);

export { FIREBASE_APP, FIREBASE_AUTH };