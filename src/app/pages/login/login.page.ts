import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { Credentials, LoginParams } from "src/app/models/auth";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.setupLoginForm();
  }

 login(credentials: Credentials): void 
 {
  
   this.authService.signIn(credentials.email,credentials.password)
   .then((res) => {
    if(res){
      this.presentToastWhenSuccess();
      this.router.navigateByUrl("tabs", { replaceUrl: true });
    }
   
   })
   .catch((error) => {
    this.presentToastWhenError(error)
   })
 }

 async presentToastWhenError(error) {
  const toast = await this.toastController.create({
    message: error,
    duration: 2000,
    color: "danger",
    position: 'top'
  });
  toast.present();
}
 async presentToastWhenSuccess() {
  const toast = await this.toastController.create({
    message: 'You have successfully SignedIn.',
    duration: 2000,
    color: "success",
    position: 'top'
  });
  toast.present();
}
  private setupLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: [null, Validators.required],
    });
  }
}
