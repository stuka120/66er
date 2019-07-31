import { StufenCardModel } from "../../model/stufen-card.model";

export interface State {
  needStufenInfos: boolean;
  biberStufenInfo?: StufenCardModel;
  wiwoeStufenInfo?: StufenCardModel;
  guspStufenInfo?: StufenCardModel;
  caexStufenInfo?: StufenCardModel;
  raroStufenInfo?: StufenCardModel;

  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  needStufenInfos: true,

  biberStufenInfo: null,
  wiwoeStufenInfo: null,
  guspStufenInfo: null,
  caexStufenInfo: null,
  raroStufenInfo: null,

  isLoading: false,
  error: null
};
