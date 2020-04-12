import {
  AlertModes,
  PresentationModes
} from "../../components/components/alert/alert.component-model";

export interface AppConfig {
  /**
   * The banner that can be shown on top of the page in case of some important
   * news
   */
  dangerBanner?: InfoBannerModel;
}

export interface InfoBannerModel {
  /**
   * Enables or disables the info-banner
   */
  active: boolean;

  /**
   * The text that is shown in the header of the alert model
   */
  headerText?: string;

  /**
   * The text that is shown in the body if the alert model
   */
  bodyText: string;

  /**
   * The text that is shown in the footer text
   */
  footerText?: string;

  /**
   * info = blue info box
   * danger = red info box
   */
  mode: AlertModes;

  /**
   * overlay = present under navbar over other elements
   * insert = insert under the navbar
   */
  presentationMode?: PresentationModes;
}
