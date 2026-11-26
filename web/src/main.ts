import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const MIN_SPLASH_DURATION = 3000;

const startedAt =
  (window as Window & { splashStartedAt?: number })
    .splashStartedAt ?? performance.now();

const remainingDuration = Math.max(
  0,
  MIN_SPLASH_DURATION - (performance.now() - startedAt)
);

const minimumDuration = new Promise<void>((resolve) => {
  setTimeout(resolve, remainingDuration);
});

Promise.all([
  bootstrapApplication(App, appConfig)
    .catch((err) => console.error(err)),
  minimumDuration
])
  .then(() => {
    const splash = document.getElementById('splash-screen');

    splash?.classList.add('hidden');

    setTimeout(() => splash?.remove(), 200);
  })
  .catch((error) => {
    console.error('Application initialization failed', error);

    const splash = document.getElementById('splash-screen');

    if (splash) {
      splash.textContent = 'Unable to start. Please refresh.';
    }
  });