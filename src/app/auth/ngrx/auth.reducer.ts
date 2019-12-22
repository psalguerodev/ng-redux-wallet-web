import { UserActions, SET_USER_ACTION } from './auth.actions';
import { User } from '../model/user.model';

export interface AuthState {
  user: User;
}

const userInitState: AuthState = { user: null };

export function authReducer(state = userInitState, action: UserActions): AuthState {

  switch(action.type) {

    case SET_USER_ACTION:
      return {
        user: {
          ...action.user
        }
      }

    default:
      return state;
  }

}
