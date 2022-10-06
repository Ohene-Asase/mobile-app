import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore} from '@angular/fire/firestore';
import {  FirebaseUser } from '../models/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData: FirebaseUser
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
    ) 
    {
      this.ngFireAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
     }

    //  Signin with email and password
   signIn(email,password):Promise<any> 
   {
    return this.ngFireAuth.signInWithEmailAndPassword(email,password);
   } 

  //  Register user with email/password
   registerUser(email,password): Promise<any>
   {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
   }

   sendVerificationMail(): Promise<any>
   {
    return this.ngFireAuth.currentUser.then((user) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      });
    })
   }

  //  Recover password
   passwordRecover(resetPassword): Promise<any>
   {
     return this.ngFireAuth.sendPasswordResetEmail(resetPassword)
     .then(() => {
      window.alert("Password reset email has been sent, please check your inbox")
     })
     .catch((error) => {
      window.alert(error)
     })
   }
   
    // Return true when user is loggedIn
   get isLoggedIn(): boolean 
   {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !==false ? true : false;
   }

   //Returns true when user's email is verified
   get isEmailVeried(): boolean
   {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
   }

   //Sign-Out
   signOut():Promise<any>
   {
     return this.ngFireAuth.signOut().then(() => {
     localStorage.removeItem('user');
     this.router.navigate(['login']);

     })
  }
}
