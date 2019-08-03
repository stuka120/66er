import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./state";
import {CalenderEventModel} from "../../model/calender-event.model";

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getEvents = (state: State): CalenderEventModel[] => state.events;
const getNeedEvents = (state: State): boolean => state.needEvents;

const selectStartDashboardFeatureSelector = createFeatureSelector("calendar");


export const selectCalendarEvents = createSelector(
  selectStartDashboardFeatureSelector,
  getEvents
);

export const selectCalendarError = createSelector(
  selectStartDashboardFeatureSelector,
  getError
);

export const selectCalendarNeedEvents = createSelector(
  selectStartDashboardFeatureSelector,
  getNeedEvents
);

export const selectCalendarIsLoading = createSelector(
  selectStartDashboardFeatureSelector,
  getIsLoading
);
