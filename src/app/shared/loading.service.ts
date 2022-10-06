import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  constructor(public loadingCtrl: LoadingController) {}

  showLoading() {
    this.loadingCtrl.getTop().then((hasLoading) => {
      if (!hasLoading) {
        this.loadingCtrl
          .create({
            translucent: true,
          })
          .then((loading) => loading.present());
      }
    });
  }

  stopLoading() {
    this.loadingCtrl.getTop().then((hasLoading) => {
      if (hasLoading) {
        this.loadingCtrl.dismiss();
      }
    });
  }
}
