import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/auth";
import { AuthService } from "../services/authh.service";
import { ThemeService } from "../shared/theme.service";
import { Plugins } from "@capacitor/core";
import { StoreKeys } from "../shared/config-keys";
import { Platform } from "@ionic/angular";
const { Storage } = Plugins;

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  user: User;
  prefersDark = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    public plt: Platform
  ) {}

  async ionViewWillEnter() {
    this.user = JSON.parse(await this.authService.isLoggedIn());
    Storage.get({ key: StoreKeys.AppTheme }).then(
      (t) => (this.prefersDark = JSON.parse(t.value))
    );
  }

  async toggleTheme(isDark: boolean) {
    this.themeService.toggleDarkTheme(isDark);
    await Storage.set({
      key: StoreKeys.AppTheme,
      value: JSON.stringify(isDark),
    });
  }

  async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl("/login", { replaceUrl: true });
  }
}
