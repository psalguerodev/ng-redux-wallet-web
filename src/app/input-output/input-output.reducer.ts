import { InputOutput } from './model/input-output.model';
import { IOActions, SET_ITEM_ACTION, UNSET_ITEM_ACTION } from './input-output.actions';
import { AppState } from '../app.reducer';

export interface IOState {
  items: InputOutput[]
};

export interface DashboardState extends AppState {
  io: IOState;
}

const initIOState: IOState = {
  items: []
};

export function IOReducer(state = initIOState, action: IOActions ): IOState {

  switch(action.type) {
    case SET_ITEM_ACTION:
      return {
          items: [
              ...action.items.map( item => {
                  return {
                      ...item
                  };
              })
          ]
      };

    case UNSET_ITEM_ACTION:
      return { items: [] };

    default:
      return state;
  }

}