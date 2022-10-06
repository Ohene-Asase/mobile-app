import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginParams, LoginResponse, User } from "../models/auth";
import { StoreKeys } from "../shared/config-keys";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  currentUser: User;
  loggedInSource = new Subject<boolean>();
  loggedIn$ = this.loggedInSource.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginParams) {
    return this.http
      .post<LoginResponse>(`${environment.baseApi}/auth/login`, credentials)
      .toPromise();
  }

  signUp(credentials: any) {
    return this.http
      .post<boolean>(`${environment.baseApi}/auth/signUp`, credentials)
      .toPromise();
  }

  resetPassword(credentials: any) {
    return this.http
      .post<boolean>(`${environment.baseApi}/auth/resetPassword`, credentials)
      .toPromise();
  }

  forgetPassword(username: any) {
    return this.http
      .get<boolean>(
        `${environment.baseApi}/auth/forgetPassword?username=${username}`
      )
      .toPromise();
  }

  async setUser(user: LoginResponse): Promise<void> {
    const userData = JSON.parse(atob(user.token.split(".")[1]));

    this.currentUser = {
      username: user.username,
      name: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    } as User;

    await Storage.set({ key: StoreKeys.Token, value: btoa(user.token) });
    await Storage.set({
      key: StoreKeys.CurrentUser,
      value: JSON.stringify(this.currentUser),
    });
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    await Storage.remove({ key: StoreKeys.CurrentUser });
    await Storage.remove({ key: StoreKeys.Token });
  }

  announceLogin(isLoggedIn: boolean) {
    this.loggedInSource.next(isLoggedIn);
  }

  async isLoggedIn() {
   let isAuthenticated = await Storage.get({
      key: StoreKeys.CurrentUser
    });
    return isAuthenticated.value;
  }
}
