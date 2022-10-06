import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
import { StoreKeys } from '../shared/config-keys';
const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router) {}

  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await Storage.get({ key: StoreKeys.INTRO_KEY });

    if (hasSeenIntro && hasSeenIntro.value === "true") {
      return true;
    } else {
      this.router.navigateByUrl("/intro", { replaceUrl: true });
      return true;
    }
  }
}
