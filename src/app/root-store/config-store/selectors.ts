import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConfigState, State } from "./state";
import { PostResponseModel } from "../../model/responses/post.model";
import { RootStoreState } from "../index";

const selectConfigFeature = createSelector(
  (state: RootStoreState.RootState) => state,
  state => state.config
);

const selectIsLoading = createSelector(
  selectConfigFeature,
  state => state.isLoading
);

export const selectConfig = createSelector(
  selectConfigFeature,
  state => state && state.config
);
