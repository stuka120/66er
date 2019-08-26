export interface State {
  needStufenInfos: boolean;
  stufenInfos: {
    biber?: StufenInfoState;
    wiwoe?: StufenInfoState;
    gusp?: StufenInfoState;
    caex?: StufenInfoState;
    raro?: StufenInfoState;
  };
  needStufenTeaser: boolean;
  stufenTeaser: {
    biber?: StufenInfoState;
    wiwoe?: StufenInfoState;
    gusp?: StufenInfoState;
    caex?: StufenInfoState;
    raro?: StufenInfoState;
  };
  needHeimstundenInfos: boolean;
  heimstundenInfos: StufenHeimstundenCollection;

  isLoading: boolean;
  error: string | null;
}

export interface StufenInfoState {
  stufenUri: string[];
  imgUrl: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
}

export interface StufenHeimstundenCollection {
  biber?: StufenHeimstundenInfoState;
  wiwoe?: StufenHeimstundenInfoState;
  gusp?: StufenHeimstundenInfoState;
  caex?: StufenHeimstundenInfoState;
  raro?: StufenHeimstundenInfoState;
}

export interface StufenHeimstundenInfoState {
  title: string;
  timeDescription: string;
}

export const initialState: State = {
  needStufenInfos: true,
  stufenInfos: {
    biber: null,
    wiwoe: null,
    gusp: null,
    caex: null,
    raro: null
  },
  needStufenTeaser: true,
  stufenTeaser: {
    biber: null,
    wiwoe: null,
    gusp: null,
    caex: null,
    raro: null
  },
  needHeimstundenInfos: true,
  heimstundenInfos: {
    biber: null,
    wiwoe: null,
    gusp: null,
    caex: null,
    raro: null
  },

  isLoading: false,
  error: null
};
