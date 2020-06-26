import { createSelector } from "@ngrx/store";
import { selectPostsError, selectStartDashboardIsLoading } from "./posts-store/selectors";

export const selectHasErrors = createSelector(selectPostsError, (startDashboardError) => startDashboardError);

export const selectIsLoading = createSelector(
  selectStartDashboardIsLoading,
  (startDashboardIsLoading) => startDashboardIsLoading
);
