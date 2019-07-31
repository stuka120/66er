import { createAction, props } from "@ngrx/store";
import { StufenCardModel } from "../../model/stufen-card.model";

export const loadAllStufenAction = createAction(
  "[StufenInfo] Load stufen-infos"
);

export const loadAllStufenSuccessAction = createAction(
  "[StufenInfo] Load stufen-infos success",
  props<{
    payload: {
      biber: StufenCardModel;
      wiwoe: StufenCardModel;
      gusp: StufenCardModel;
      caex: StufenCardModel;
      raro: StufenCardModel;
    };
  }>()
);

export const loadAllStufenErrorAction = createAction(
  "[StufenInfo] Load stufen-infos error",
  props<{ payload: { error: string } }>()
);
