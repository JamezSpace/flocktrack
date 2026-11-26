import { IdentityApi } from '../api/identity.api';
import { IdentityStateEnum } from '../enums/identityState.enum';

type IdentityState =
  | { status: IdentityStateEnum.IDLE }
  | { status: IdentityStateEnum.LOADING }
  | { status: IdentityStateEnum.LOADED; identity: IdentityApi }
  | { status: IdentityStateEnum.ERROR; error: unknown };

export type { IdentityState };