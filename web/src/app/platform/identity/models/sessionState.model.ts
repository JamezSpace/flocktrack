import type { User } from 'firebase/auth';
import { SessionStateEnum } from '../enums/sessionState.enum';

type SessionState =
  | { status: SessionStateEnum.INITIALIZING }
  | { status: SessionStateEnum.AUTHENTICATED; user: User }
  | { status: SessionStateEnum.UNAUTHENTICATED }
  | { status: SessionStateEnum.ERROR; error: unknown };

export type { SessionState };