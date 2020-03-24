import { createAction, props } from "@ngrx/store";
import { AppConfig } from "../../model/config/app.config";

export const loadConfigAction = createAction("[Config] loadConfig");

export const loadConfigSuccessAction = createAction(
  "[Config] loadConfig success",
  props<{ payload: { config: AppConfig } }>()
);

export const loadConfigErrorAction = createAction("[Config] loadConfig error");
