import {createAction, props} from "@ngrx/store";
import {CalenderEventModel} from "../../model/calender-event.model";

export const loadEventsAction = createAction("[Calendar] Load events");

export const loadEventsSuccessAction = createAction(
  "[Calendar] Load events success",
  props<{ payload: { events: CalenderEventModel[] } }>()
);

export const loadEventsErrorAction = createAction(
  "[Calendar] Load events error",
  props<{ payload: { error: string } }>()
);
