export interface AlertComponentModel {
  isActive: boolean;
  headlineText?: string;
  bodyText: string;
  expandableSection?: {
    expandableText: string;
    expandButtonText: string;
    collapseButtonText: string;
  };
  alertMode: AlertModes;
  presentationMode: PresentationModes;
}

export type AlertModes = "info" | "danger";
export type PresentationModes = "overlay" | "insert";
