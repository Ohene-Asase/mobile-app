import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ChatService } from '../services/chat.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
messages = [
   {
    user: 'simon',
    createdAt:2000,
    msg: 'Hey whats up mate'
   },
   {
    user: 'soma',
    createdAt:3455,
    msg:'Working on the Ionic mission'
   }
];
currentUser ='soma'
newMsg = '';
@ViewChild(IonContent) content: IonContent
  constructor(private chatService: ChatService) {}
  ngOnInit(){
  
  }



  sendMessage(){
   this.messages.push({
    user:'soma',
    createdAt: new Date().getTime(),
    msg: this.newMsg
   });
   this.newMsg = ''
   setTimeout(() => {
    this.content.scrollToBottom(200);
   }, );

  }

  // generateToken(): void
  // {
  //   googleAuth.authenticate({
  //     // use the email address of the service account, as seen in the API console
  //     email: environment.dialogflow.GOOGLE_APPLICATION_CREDENTIALS.client_email,
  //     // use the PEM file we generated from the downloaded key
  //     keyFile: environment.dialogflow.GOOGLE_APPLICATION_CREDENTIALS.private_key,
  //     // specify the scopes you wish to access
  //     scopes: ['https://www.googleapis.com/auth/drive.readonly']
  //   }, function (err, token) {
  //     console.log(token);
  //   });
  // }
}
