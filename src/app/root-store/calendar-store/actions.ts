import {createAction, props} from "@ngrx/store";
import {GoogleCalenderEventResponseModel} from "../../model/google-calender-event-response.model";

export const loadEventsAction = createAction("[Calendar] Load events");

export const loadEventsSuccessAction = createAction(
  "[Calendar] Load events success",
  props<{ payload: { events: GoogleCalenderEventResponseModel[] } }>()
);

export const loadEventsErrorAction = createAction(
  "[Calendar] Load events error",
  props<{ payload: { error: string } }>()
);
