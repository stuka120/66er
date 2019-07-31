import { createAction, props } from "@ngrx/store";
import { Post } from "../../model/post.model";

export const loadNewsAction = createAction("[StartDashboard] Load news");

export const loadNewsSuccessAction = createAction(
  "[StartDashboard] Load news success",
  props<{ payload: { posts: Post[] } }>()
);

export const loadNewsErrorAction = createAction(
  "[StartDashboard] Load news error",
  props<{ payload: { error: string } }>()
);
