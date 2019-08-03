import {PostsState} from "./posts-store";
import {StufenInfoState} from "./stufen-info-store";
import {CalendarState} from "./calendar-store";

export interface RootState {
  startDashboard: PostsState.State;
  stufenInfos: StufenInfoState.State;
  calendar: CalendarState.State;
}
