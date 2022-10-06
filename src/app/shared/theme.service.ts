import { Injectable } from "@angular/core";
import { Plugins, StatusBarStyle } from "@capacitor/core";
import { StoreKeys } from "./config-keys";
const { Storage, StatusBar, DarkMode } = Plugins;
import "capacitor-dark-mode";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  constructor() {
    this.checkThemePlug();
  }

  async toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle("dark", shouldAdd);
    await Storage.set({
      key: StoreKeys.AppTheme,
      value: JSON.stringify(shouldAdd),
    });
    await this.changeStatusBar(shouldAdd);
  }

  async changeStatusBar(isDark: boolean) {
    try {
      // Works only for andorid devices
      await StatusBar.setStyle({
        style: isDark ? StatusBarStyle.Dark : StatusBarStyle.Light,
      });

      await StatusBar.setBackgroundColor({
        color: isDark ? "#121212" : "#ffffff",
      });

      // Display content under transparent status bar (Android only)
      await StatusBar.setOverlaysWebView({
        overlay: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async checkThemePlug() {
    const theme = await Storage.get({ key: StoreKeys.AppTheme });
    if (JSON.parse(theme.value) === null) {
      DarkMode.addListener("darkModeStateChanged", async (state: any) => {
        if (state.isDarkModeOn) {
          // Dark mode is on. Apply dark theme to your app
          await this.toggleDarkTheme(true);
          // this.ref.detectChanges();
        } else {
          // Dark mode is off. Apply light theme to your app
          await this.toggleDarkTheme(false);
          // this.ref.detectChanges();
        }
        if (state.supported == false) {
          // Dark mode is not supported by the platform
          console.log("dark mode is not supported");
          Storage.get({ key: StoreKeys.AppTheme }).then((t) =>
            t.value !== null
              ? this.toggleDarkTheme(JSON.parse(t.value))
              : this.toggleDarkTheme(false)
          );
        }
      });
    } else {
      this.toggleDarkTheme(JSON.parse(theme.value));
    }
  }
}
