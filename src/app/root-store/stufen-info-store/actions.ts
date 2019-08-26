import { createAction, props } from "@ngrx/store";
import { StufenHeimstundenCollection, StufenInfoState } from "./state";

export const loadAllStufenAction = createAction(
  "[StufenInfo] Load stufen-infos"
);

export const loadAllStufenSuccessAction = createAction(
  "[StufenInfo] Load stufen-infos success",
  props<{
    payload: {
      biber: StufenInfoState;
      wiwoe: StufenInfoState;
      gusp: StufenInfoState;
      caex: StufenInfoState;
      raro: StufenInfoState;
    };
  }>()
);

export const loadAllStufenErrorAction = createAction(
  "[StufenInfo] Load stufen-infos error",
  props<{ payload: { error: string } }>()
);

export const loadAllStufenTeasersAction = createAction(
  "[StufenInfo] Load stufen-teasers"
);

export const loadAllStufenTeasersSuccessAction = createAction(
  "[StufenInfo] Load stufen-teasers success",
  props<{
    payload: {
      biber: StufenInfoState;
      wiwoe: StufenInfoState;
      gusp: StufenInfoState;
      caex: StufenInfoState;
      raro: StufenInfoState;
    };
  }>()
);

export const loadAllStufenTeasersErrorAction = createAction(
  "[StufenInfo] Load stufen-teasers error",
  props<{ payload: { error: string } }>()
);

export const loadAllHeimstundenAction = createAction(
  "[StufenInfo] Load stufen heimstunden"
);

export const loadAllHeimstundenSuccessAction = createAction(
  "[StufenInfo] Load stufen heimstunden success",
  props<{
    payload: {
      heimstundenInfos: StufenHeimstundenCollection;
    };
  }>()
);

export const loadAllHeimstundenErrorAction = createAction(
  "[StufenInfo] Load stufen heimstunden fail",
  props<{ payload: { error: string } }>()
);
