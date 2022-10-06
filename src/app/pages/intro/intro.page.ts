import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IonSlides } from "@ionic/angular";
import { Plugins } from "@capacitor/core";
import { StoreKeys } from 'src/app/shared/config-keys';
const { Storage } = Plugins;

@Component({
  selector: "app-intro",
  templateUrl: "./intro.page.html",
  styleUrls: ["./intro.page.scss"],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router) {}

  ngOnInit() {}

  next() {
    this.slides.slideNext();
  }

  async start() {
    await Storage.set({ key: StoreKeys.INTRO_KEY, value: "true" });
    this.router.navigateByUrl("/welcome", { replaceUrl: true });
  }
}
