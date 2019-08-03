import {CalenderEventModel} from "../../model/calender-event.model";

export interface State {
  events: CalenderEventModel[];
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
