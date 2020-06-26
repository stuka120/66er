import { GoogleCalenderEventResponseModel } from "../../shared/model/responses/google-calender-event-response.model";

export interface State {
  events: GoogleCalenderEventResponseModel[];
  needEvents: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  events: [],
  isLoading: false,
  error: null,
  needEvents: true
};
