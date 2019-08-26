import { createReducer, on } from "@ngrx/store";
import { initialState } from "./state";
import { Post } from "../../model/post.model";
import {
  loadNewsAction,
  loadNewsErrorAction,
  loadNewsSuccessAction
} from "./actions";

const myReducer = createReducer(
  initialState,
  on(loadNewsAction, state => ({
    ...state,
    isLoading: true,
    error: undefined,
    needPosts: true
  })),
  on(
    loadNewsSuccessAction,
    (state, action: { payload: { posts: Post[] } }) => ({
      posts: action.payload.posts,
      isLoading: false,
      error: null,
      needPosts: false
    })
  ),
  on(loadNewsErrorAction, (state, action: { payload: { error: string } }) => ({
    ...state,
    isLoading: false,
    error: action.payload.error,
    needPosts: false
  }))
);

export function reducer(state, action) {
  return myReducer(state, action);
}