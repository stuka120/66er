import { createAction, props } from "@ngrx/store";
import { WordpressPostResponseModel } from "../../shared/model/responses/wordpress/wordpress-post-response.model";

export const loadNewsAction = createAction("[Posts] Load posts");

export const loadNewsSuccessAction = createAction(
  "[Posts] Load posts success",
  props<{ payload: { posts: WordpressPostResponseModel[] } }>()
);

export const loadNewsErrorAction = createAction("[Posts] Load posts error", props<{ payload: { error: string } }>());
