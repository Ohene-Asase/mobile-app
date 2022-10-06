import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private alertCtrl: AlertController) {}

  async showAlert(msg: string, title: string, subtitle?: string) {
    const alert = await this.alertCtrl.create({
      translucent: true,
      header: title,
      subHeader: subtitle,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
