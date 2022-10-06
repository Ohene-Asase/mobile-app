import {
  HttpHandler,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AlertService } from "../shared/alert.service";
import { StoreKeys } from "../shared/config-keys";
import { AuthService } from "./authh.service";
import { values, flatten } from 'underscore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService {
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const token: string = localStorage.getItem(StoreKeys.Token);
    let authReq = req.clone();
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${atob(token)}` },
      });
    }

    return next.handle(authReq).pipe(
      tap(
        (response: HttpResponse<any>) => {
          switch (response.status) {
            case 201: // Created
              // Toast.success('Data saved successfully.');
              break;
            case 200: // Success
              switch (req.method) {
                case "PUT":
                  // Toast.success('Record updated successfully.');
                  break;
                case "DELETE":
                // Toast.success('Data deleted successfully.');
                default:
                  // Toast.clear();
                  break;
              }
            default:
              break;
          }
          if (
            response.status === 200 &&
            req.method !== "GET" &&
            !response.url.endsWith("query")
          ) {
            // Toast.success(response.body.success);
          }
        },
        (err) => {
          switch (err.status) {
            case 401: // Unauthorized
              const isLogin = this.authService.isLoggedIn();
              if (isLogin) {
                setTimeout(() => {
                  // Toast.error('Session expired. Please login');
                  this.showAlert('Session expired', 'You will be logged out')
                  this.authService.logout();
                  location.reload();
                }, 400);
              } else {
                // Toast.error(err.error);
                this.showToast(err.error, 'danger')
              }
              break;
            case 403: // Forbidden
              // Toast.error('You are not authorized to perform this action. Contact your administrator.');
              this.showToast('You are not authorized to perform this action. Contact your administrator.', 'danger')
              break;
            case 400: // Bad Request
              // Toast.error(this.refactorError(err));
              this.showToast(this.refactorError(err), 'danger')
              break;
            case 404: // Not Found
              // Toast.error('Resource doesn\'t exist.');
              this.showToast('Resource doesn\'t exist.', 'danger')
              break;
            case 500: // Internal Server Error
              // Toast.error(err.error);
              this.showToast(err.error, 'danger')
              break;
            default:
              // Toast.error(err.statusText);
              this.showToast(err.statusText, 'danger')
              break;
          }
        }
      )
    );
  }

  async showToast(msg: any, col: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: col
    });
    toast.present();
  }

  async showAlert(title: string, msg?: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  private refactorError(err: any): string {
    if (err.error) {
      if (err.error.errors) {
        const errors: string[] = flatten(values(err.error.errors));
        return errors.join("\n");
      } else {
        return err.error;
      }
    } else if (err.message) {
      return err.message;
    }
  }
}
