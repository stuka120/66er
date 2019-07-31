import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import { StufenCardModel } from "../../model/stufen-card.model";

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getBiberStufenInfos = (state: State): StufenCardModel =>
  state.biberStufenInfo;
const getWiWoeStufenInfos = (state: State): StufenCardModel =>
  state.wiwoeStufenInfo;
const getGuSpStufenInfos = (state: State): StufenCardModel =>
  state.guspStufenInfo;
const getCaExStufenInfos = (state: State): StufenCardModel =>
  state.caexStufenInfo;
const getRaRoStufenInfos = (state: State): StufenCardModel =>
  state.raroStufenInfo;
const getNeedStufenInfos = (state: State): boolean => state.needStufenInfos;

const selectStufenInfosFeatureSelector = createFeatureSelector("stufenInfos");

export const selectBiberStufenInfos = createSelector(
  selectStufenInfosFeatureSelector,
  getBiberStufenInfos
);

export const selectWiWoeStufenInfos = createSelector(
  selectStufenInfosFeatureSelector,
  getWiWoeStufenInfos
);

export const selectGuSpStufenInfos = createSelector(
  selectStufenInfosFeatureSelector,
  getGuSpStufenInfos
);

export const selectCaExStufenInfos = createSelector(
  selectStufenInfosFeatureSelector,
  getCaExStufenInfos
);

export const selectRaRoStufenInfos = createSelector(
  selectStufenInfosFeatureSelector,
  getRaRoStufenInfos
);

export const selectStufenInfosAll = createSelector(
  selectBiberStufenInfos,
  selectWiWoeStufenInfos,
  selectGuSpStufenInfos,
  selectCaExStufenInfos,
  selectRaRoStufenInfos,
  (biber, wiwoe, gusp, caex, raro) => ({
    biber,
    wiwoe,
    gusp,
    caex,
    raro
  })
);

export const selectStufenInfosIsLoading = createSelector(
  selectStufenInfosFeatureSelector,
  getIsLoading
);

export const selectStufenInfosNeedStufenInfos = createSelector(
  selectStufenInfosFeatureSelector,
  getNeedStufenInfos
);
