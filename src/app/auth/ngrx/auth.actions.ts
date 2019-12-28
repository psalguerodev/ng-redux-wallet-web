import { Action } from '@ngrx/store';
import { User } from '../model/user.model';

export const SET_USER_ACTION = '[Auth] Set user authenticated';
export const UNSET_USER_ACTION = '[Auth] unset user authenticated';

export class SetUserAction implements Action {
  readonly type = SET_USER_ACTION;

  constructor(public user: User) {}
}

export class UnsetUserAction implements Action {
  readonly type = UNSET_USER_ACTION;
}

export type UserActions = SetUserAction | UnsetUserAction;
