import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/ngrx/auth.reducer';
import { uiReducer, UiState } from './shared/sidebar/ui.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
};

