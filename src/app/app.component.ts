import { Component, OnInit } from "@angular/core";
import { FacebookService } from 'ngx-facebook';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ng-wordpress";
  applicationId: string;

  constructor(private fbService: FacebookService) {}

  ngOnInit(): void {
    let self = this;
    self.applicationId = "2404142946530814";  // **Enter your Created FB App's ID**
    self.loadFBSDK();
  }

  loadFBSDK() {
    let self = this;
    (<any>window).fbAsyncInit = () => {
      this.fbService.init({
        appId: self.applicationId,
        xfbml: false,
        version: 'v3.3'
      });
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-js-sdk'));
  }
}
