import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import { Post } from "../../model/post.model";

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getPosts = (state: State): Post[] => state.posts;
const getNeedsPosts = (state: State): boolean => state.needPosts;

const selectStartDashboardFeatureSelector = createFeatureSelector(
  "startDashboard"
);

export const selectStartDashboardIsLoading = createSelector(
  selectStartDashboardFeatureSelector,
  getIsLoading
);

export const selectStartDashboardPosts = createSelector(
  selectStartDashboardFeatureSelector,
  getPosts
);

export const selectStartDashboardError = createSelector(
  selectStartDashboardFeatureSelector,
  getError
);

export const selectStartDashboardNeedsPosts = createSelector(
  selectStartDashboardFeatureSelector,
  getNeedsPosts
);
