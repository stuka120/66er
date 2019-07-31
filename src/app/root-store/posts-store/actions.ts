import { createAction, props } from "@ngrx/store";
import { Post } from "../../model/post.model";

export const loadNewsAction = createAction("[Posts] Load posts");

export const loadNewsSuccessAction = createAction(
  "[Posts] Load posts success",
  props<{ payload: { posts: Post[] } }>()
);

export const loadNewsErrorAction = createAction(
  "[Posts] Load posts error",
  props<{ payload: { error: string } }>()
);
