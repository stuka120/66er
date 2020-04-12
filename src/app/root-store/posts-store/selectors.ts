import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import { PostResponseModel } from "../../model/responses/post.model";

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getPosts = (state: State): PostResponseModel[] => state.posts;
const getNeedPosts = (state: State): boolean => state.needPosts;

const selectStartDashboardFeatureSelector = createFeatureSelector("posts");

export const selectStartDashboardIsLoading = createSelector(
  selectStartDashboardFeatureSelector,
  getIsLoading
);

export const selectPostsPosts = createSelector(
  selectStartDashboardFeatureSelector,
  getPosts
);

export const selectPostsError = createSelector(
  selectStartDashboardFeatureSelector,
  getError
);

export const selectPostsNeedPosts = createSelector(
  selectStartDashboardFeatureSelector,
  getNeedPosts
);

export const selectPostsIsLoading = createSelector(
  selectStartDashboardFeatureSelector,
  getIsLoading
);
