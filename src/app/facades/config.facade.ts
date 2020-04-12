import { Injectable } from "@angular/core";
import { ConfigurationService } from "../services/configuration.service";
import { Observable } from "rxjs";
import { AlertComponentModel } from "../components/components/alert/alert.component-model";
import { filter, map } from "rxjs/operators";
import { InfoBannerModel } from "../model/config/app.config";
import { isNotNullOrUndefined } from "../utils/rxjs/predicate/filter-is-not-null-or-empty.util";

@Injectable({
  providedIn: "root"
})
export class ConfigFacade {
  constructor(private configurationService: ConfigurationService) {}

  getAlertModel$(): Observable<AlertComponentModel> {
    return this.configurationService.getConfig$().pipe(
      map(config => config.dangerBanner),
      filter(isNotNullOrUndefined),
      map(this.mapToAlertComponentModel)
    );
  }

  mapToAlertComponentModel(
    infoBannerModel: InfoBannerModel
  ): AlertComponentModel {
    return {
      isActive: infoBannerModel.active,
      alertMode: infoBannerModel.mode,
      presentationMode: infoBannerModel.presentationMode,
      bodyText: infoBannerModel.bodyText,
      headerText: infoBannerModel.headerText
    };
  }
}
