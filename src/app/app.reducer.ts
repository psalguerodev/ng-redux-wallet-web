import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/ngrx/auth.reducer';
import { IOReducer, IOState } from './input-output/input-output.reducer';
import { uiReducer, UiState } from './shared/sidebar/ui.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
  io: IOState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
  io: IOReducer,
};

