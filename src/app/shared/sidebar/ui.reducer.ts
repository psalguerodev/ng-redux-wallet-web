import * as fromUI from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initState: UiState = {
  isLoading: false
};

export function uiReducer(state = initState, action: fromUI.UiActions): UiState {

  switch (action.type) {

    case fromUI.SET_ENABLE_LOADING:
      return { ...state, isLoading: true };

    case fromUI.SET_DISABLE_LOADING:
      return { ...state, isLoading: false };

    default: return state;
  }

}
