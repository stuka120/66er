import { createSelector } from "@ngrx/store";
import {
  selectStartDashboardError,
  selectStartDashboardIsLoading
} from "./start-dashboard-store/selectors";

export const selectHasErrors = createSelector(
  selectStartDashboardError,
  startDashboardError => startDashboardError
);

export const selectIsLoading = createSelector(
  selectStartDashboardIsLoading,
  startDashboardIsLoading => startDashboardIsLoading
);
