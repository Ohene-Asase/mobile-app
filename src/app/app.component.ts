import { Component } from "@angular/core";

import { AlertController, IonRouterOutlet, Platform } from "@ionic/angular";
import { ThemeService } from "./shared/theme.service";

import { App, Plugins } from "@capacitor/core";
import { timer } from "rxjs";
import { Location } from "@angular/common";
const { SplashScreen } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  showSplash = true;

  constructor(
    private platform: Platform,
    private themeService: ThemeService,
    private _location: Location,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await SplashScreen.hide();
      timer(2000).subscribe(() => (this.showSplash = false));
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (
        this._location.isCurrentPathEqualTo("/tabs/tab1") ||
        this._location.isCurrentPathEqualTo("/welcome")
      ) {
        this.showExitConfirm();
        processNextHandler();
      } else {
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log("Handler called to force close!");
      this.alertController
        .getTop()
        .then((r) => {
          if (r) {
            navigator["app"].exitApp();
          }
        })
        .catch((e) => {
          // console.log(e);
        });
    });
  }

  showExitConfirm() {
    this.alertController
      .create({
        header: "Exit App",
        message: "Do you want to close the app?",
        backdropDismiss: false,
        buttons: [
          {
            text: "Stay",
            role: "cancel",
            handler: () => {
              console.log("Application exit prevented!");
            },
          },
          {
            text: "Exit",
            handler: () => {
              navigator["app"].exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
