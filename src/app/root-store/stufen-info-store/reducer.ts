import { createReducer, on } from "@ngrx/store";
import { initialState } from "./state";
import {
  loadAllHeimstundenAction,
  loadAllHeimstundenErrorAction,
  loadAllHeimstundenSuccessAction,
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
    stufenInfos: {
      biber: action.payload.biber,
      wiwoe: action.payload.wiwoe,
      gusp: action.payload.gusp,
      caex: action.payload.caex,
      raro: action.payload.raro
    },
    needStufenInfos: false,

    isLoading: false,
    error: null
  })),
  on(loadAllStufenErrorAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload.error,
    needStufenInfos: false
  })),
  on(loadAllHeimstundenAction, state => ({
    ...state,
    isLoading: true,
    error: undefined,
    needHeimstundenInfos: true
  })),
  on(loadAllHeimstundenSuccessAction, (state, action) => ({
    ...state,
    needHeimstundenInfos: false,
    heimstundenInfos: {
      biber: action.payload.heimstundenInfos.biber,
      wiwoe: action.payload.heimstundenInfos.wiwoe,
      gusp: action.payload.heimstundenInfos.gusp,
      caex: action.payload.heimstundenInfos.caex,
      raro: action.payload.heimstundenInfos.raro
    },
    error: null,
    isLoading: false
  })),
  on(loadAllHeimstundenErrorAction, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload.error,
    needHeimstundenInfos: false
  }))
);
