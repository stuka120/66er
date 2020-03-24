import { createReducer, on } from "@ngrx/store";
import { initialState } from "./state";
import { loadConfigAction, loadConfigErrorAction, loadConfigSuccessAction } from "./actions";

export const configReducer = createReducer(
  initialState,
  on(loadConfigAction, state => ({
    ...state,
    isLoading: true
  })),
  on(loadConfigSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    config: {
      ...action.payload.config
    }
  })),
  on(loadConfigErrorAction, state => ({
    ...state,
    config: null,
    isLoading: false
  }))
);

export function reducer(state, action) {
  return configReducer(state, action);
}
