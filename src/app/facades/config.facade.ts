import { Injectable } from "@angular/core";
import { ConfigurationService } from "../services/configuration.service";
import { Observable } from "rxjs";
import { AlertModel } from "../components/components/alert/alert.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ConfigFacade {
  constructor(private configurationService: ConfigurationService) {}

  getAlertModel$(): Observable<AlertModel> {
    return this.configurationService.getConfig$().pipe(
      map(config => {
        if (!!config) {
          return {
            isActive: config.dangerBanner.active,
            alertMode: config.dangerBanner.mode,
            presentationMode: config.dangerBanner.presentationMode,
            bodyText: config.dangerBanner.bodyText,
            footerText: config.dangerBanner.footerText,
            headerText: config.dangerBanner.headerText
          };
        }
      })
    );
  }
}
