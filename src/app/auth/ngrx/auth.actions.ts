import { Action } from '@ngrx/store';
import { User } from '../model/user.model';

export const SET_USER_ACTION = '[Auth] Set user authenticated';

export class SetUserAction implements Action {
  readonly type = SET_USER_ACTION;

  constructor(public user: User) {}
}

export type UserActions = SetUserAction;
