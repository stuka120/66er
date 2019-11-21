import {Component, OnInit, ViewChild, ElementRef, HostListener} from "@angular/core";
import {FacebookService} from "ngx-facebook";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Pfadfindergruppe 66";
  applicationId: string;
  sticky = false;
  menuPosition: any;

  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  /**
   * see https://medium.com/@chiodigiovanni1/a-simple-on-scroll-sticky-menu-with-angular-and-bulma-66fafc7fc7b9
   * did not use position:fixed in css, makes it kaputt
   */
  @HostListener('window:scroll')
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  constructor(private fbService: FacebookService) {
  }

  ngOnInit(): void {
    let self = this;
    self.applicationId = "2404142946530814"; // **Enter your Created FB App's ID**
    self.loadFBSDK();
  }

  ngAfterViewInit() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop
  }

  loadFBSDK() {
    let self = this;
    (<any>window).fbAsyncInit = () => {
      this.fbService.init({
        appId: self.applicationId,
        xfbml: false,
        version: "v3.3"
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-js-sdk");
  }
}
