import { createAction, props } from "@ngrx/store";
import { AppConfig } from "../../model/config/app.config";

export const loadConfigAction = createAction("[Config] loadConfigFromServer");

export const loadConfigSuccessAction = createAction(
  "[Config] loadConfigFromServer success",
  props<{ payload: { config: AppConfig } }>()
);

export const loadConfigErrorAction = createAction("[Config] loadConfigFromServer error");
