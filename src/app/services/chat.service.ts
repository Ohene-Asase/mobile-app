import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as dialogflow from 'dialogflow';
	



@Injectable({
  providedIn: 'root'
})
export class ChatService {
accessToken: any
projectId: any
sessionClient: any
  constructor(private http: HttpClient ) { 


		let privateKey = environment.dialogflow.GOOGLE_APPLICATION_CREDENTIALS.private_key
		let clientEmail = environment.dialogflow.GOOGLE_APPLICATION_CREDENTIALS.client_email
		let config = {
			credentials: {
				private_key: privateKey,
				client_email: clientEmail
			}
		}
	
		this.sessionClient = new dialogflow.SessionsClient(config)
    
  }
  


//   public getToken(){
//     this.http.get('http://localhost:8100/token').subscribe((response: any) => {
// this.accessToken = response.token
//     })
//     console.log(this.accessToken)
//   }

  










 


}
