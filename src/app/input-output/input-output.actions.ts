import { Action } from '@ngrx/store';
import { InputOutput } from './model/input-output.model';

export const SET_ITEM_ACTION = '[Input-Output] Set item input / output';
export const UNSET_ITEM_ACTION = '[Input-Output] Unset item input / output';

export class SetItemIOAction implements Action {
  readonly type = SET_ITEM_ACTION;
  constructor(public items: InputOutput[]) {}
}

export class UnsetItemIOAction implements Action {
  readonly type = UNSET_ITEM_ACTION;
}

export type IOActions = SetItemIOAction | UnsetItemIOAction;
