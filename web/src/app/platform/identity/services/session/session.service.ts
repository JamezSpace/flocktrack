import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FIREBASE_AUTH } from '../../../firebase/firebase.tokens';
import { SessionState } from '../../models/sessionState.model';
import { SessionStateEnum } from '../../enums/sessionState.enum';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly auth = inject(FIREBASE_AUTH);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _state = signal<SessionState>({
    status: SessionStateEnum.INITIALIZING,
  });

  private readonly state = this._state.asReadonly();
  readonly status = computed(() => this.state().status);

  readonly isAuthenticated = computed(
    () => this.status() === SessionStateEnum.AUTHENTICATED
  );

  readonly isInitializing = computed(
    () => this.status() === SessionStateEnum.INITIALIZING
  );

  readonly user = computed(() => {
    const state = this._state();

    return state.status === SessionStateEnum.AUTHENTICATED
      ? state.user
      : null;
  });

  constructor() {
    const unsubscribe = onAuthStateChanged(this.auth, (user) => {
      this.synchronizeSession(user);
    });

    this.destroyRef.onDestroy(unsubscribe);
  }

  async signIn(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return credential.user;
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  private synchronizeSession(user: User | null): void {
    if (user) {
      this._state.set({
        status: SessionStateEnum.AUTHENTICATED,
        user,
      });
    } else {
      this._state.set({
        status: SessionStateEnum.UNAUTHENTICATED,
      });
    }
  }

  async restoreSession(): Promise<SessionState> {
    try {
      await this.auth.authStateReady();

      this.synchronizeSession(this.auth.currentUser);
    } catch (error) {
      this._state.set({
        status: SessionStateEnum.ERROR,
        error,
      });
    }

    return this.state();
  }
}
