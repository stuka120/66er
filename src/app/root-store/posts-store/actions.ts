import { createAction, props } from "@ngrx/store";
import { PostResponseModel } from "../../shared/model/responses/post.model";

export const loadNewsAction = createAction("[Posts] Load posts");

export const loadNewsSuccessAction = createAction(
  "[Posts] Load posts success",
  props<{ payload: { posts: PostResponseModel[] } }>()
);

export const loadNewsErrorAction = createAction("[Posts] Load posts error", props<{ payload: { error: string } }>());
