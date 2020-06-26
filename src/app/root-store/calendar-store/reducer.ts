import { createReducer, on } from "@ngrx/store";
import { initialState } from "./state";
import { loadEventsAction, loadEventsErrorAction, loadEventsSuccessAction } from "./actions";

const myReducer = createReducer(
  initialState,
  on(loadEventsAction, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
    needEvents: true
  })),
  on(loadEventsSuccessAction, (state, action) => ({
    events: action.payload.events,
    isLoading: false,
    error: null,
    needEvents: false
  })),
  on(loadEventsErrorAction, (state, action: { payload: { error: string } }) => ({
    ...state,
    isLoading: false,
    error: action.payload.error,
    needEvents: false
  }))
);

export function reducer(state, action) {
  return myReducer(state, action);
}
