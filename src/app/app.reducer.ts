import { ActionReducerMap } from '@ngrx/store';
import { uiReducer, UiState } from './shared/sidebar/ui.reducer';
import { AuthState, authReducer } from './auth/ngrx/auth.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};

