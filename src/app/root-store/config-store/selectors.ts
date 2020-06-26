import { RootStoreState } from "../index";
import { createSelector } from "@ngrx/store";

const selectConfigFeature = createSelector(
  (state: RootStoreState.RootState) => state,
  (state) => state.config
);

const selectIsLoading = createSelector(selectConfigFeature, (state) => state.isLoading);

export const selectConfig = createSelector(selectConfigFeature, (state) => state && state.config);
