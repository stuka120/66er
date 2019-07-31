import { createReducer, on } from "@ngrx/store";
import { initialState } from "./state";
import {
  loadAllStufenAction,
  loadAllStufenErrorAction,
  loadAllStufenSuccessAction
} from "./actions";

export const reducer = createReducer(
  initialState,
  on(loadAllStufenAction, state => ({
    ...state,
    isLoading: true,
    error: undefined,
    needStufenInfos: true
  })),
  on(loadAllStufenSuccessAction, (state, action) => ({
    ...state,
    biberStufenInfo: action.payload.biber,
    wiwoeStufenInfo: action.payload.wiwoe,
    guspStufenInfo: action.payload.gusp,
    caexStufenInfo: action.payload.caex,
    raroStufenInfo: action.payload.raro,
    isLoading: false,
    error: null,
    needStufenInfos: false
  })),
  on(loadAllStufenErrorAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload.error,
    needStufenInfos: false
  }))
);
