import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/authh.service";

@Injectable({
  providedIn: "root",
})
export class AutoLoginGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  async canLoad(): Promise<boolean> {
    if (await this.authService.isLoggedIn() !== null) {
      this.router.navigateByUrl("/tabs", { replaceUrl: true });
      return true;
    } else {
      return true;
    }
  }
}
