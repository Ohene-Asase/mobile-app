import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Credentials } from 'src/app/models/auth';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 registerForm: FormGroup;
 userData: any;
  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router,
               public toastController: ToastController

    ) { 
  }

  ngOnInit() {
    this.setupForm();
  }
  
   register(credentials: Credentials)
   {
    console.log(credentials)
     this.authService.registerUser(credentials.email,credentials.password)
     .then((res)=> {
      if(res){
        this.presentToastWhenSuccess();
      }
    })
      .catch((error) => {
        this.presentToastWhenError(error.message)
      // window.alert(error.message)
     
     })
   }

   async presentToastWhenSuccess() {
    const toast = await this.toastController.create({
      message: 'You have successfully Registered.',
      duration: 2000,
      color: "success",
      position: 'top'
    });
    toast.present();
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
  private setupForm(): void{
   this.registerForm = this.fb.group({
    email: ["", Validators.required],
    password: [null, Validators.required]
   })
  }
}
