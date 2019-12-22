import { Action } from '@ngrx/store';

export const SET_ENABLE_LOADING = '[Loading] Enable loading';
export const SET_DISABLE_LOADING = '[Loading] Disable loading';

export class SetEnableLoadingAction implements Action {
  readonly type = SET_ENABLE_LOADING;
}

export class SetDisableLoadingAction implements Action {
  readonly type = SET_DISABLE_LOADING;
}

export type UiActions = SetEnableLoadingAction | SetDisableLoadingAction;
