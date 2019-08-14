export interface StufenCardModel {
  imgUrl: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
}

export interface StufenCardCollection {
  biber: StufenCardModel;
  wiwoe: StufenCardModel;
  gusp: StufenCardModel;
  caex: StufenCardModel;
  raro: StufenCardModel;
}
