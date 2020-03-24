export interface AlertModel {
  isActive: boolean;
  headerText?: string;
  bodyText: string;
  footerText?: string;
  alertMode: AlertModes;
  presentationMode: PresentationModes;
}

export type AlertModes = "info" | "danger";
export type PresentationModes = "overlay" | "insert";
