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
  heimstundenInfos: StufenTimeCollection;

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

export interface StufenTimeCollection {
  biber?: StufenHeimstundenTimeState;
  wiwoe?: StufenHeimstundenTimeState;
  gusp?: StufenHeimstundenTimeState;
  caex?: StufenHeimstundenTimeState;
  raro?: StufenHeimstundenTimeState;
}

export interface StufenHeimstundenTimeState {
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
