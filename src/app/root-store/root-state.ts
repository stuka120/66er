import { PostsState } from "./posts-store";
import { StufenInfoState } from "./stufen-info-store";

export interface RootState {
  startDashboard: PostsState.State;
  stufenInfos: StufenInfoState.State;
}
