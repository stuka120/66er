import { PostsState } from "./posts-store";
import { StufenInfoState } from "./stufen-info-store";
import { CalendarState } from "./calendar-store";
import { ConfigState } from "./config-store";

export interface RootState {
  startDashboard: PostsState.State;
  stufenInfos: StufenInfoState.State;
  calendar: CalendarState.State;
  config: ConfigState.State;
}
