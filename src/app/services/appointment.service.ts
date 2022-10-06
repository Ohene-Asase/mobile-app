import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppointmentItems } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  collectionName = 'Health-System'
  constructor(private firestore: AngularFirestore) { }

  createAppointment(appointmentDetails: AppointmentItems): Promise<any>
  {
    return this.firestore.collection(this.collectionName).add(appointmentDetails);
  }
  getAppoinment()
  {
    return this.firestore.collection(this.collectionName).ref.orderBy('createdAt','desc')
  }

  update(appointmentDetails: AppointmentItems)
  {
  return  this.firestore.collection(this.collectionName).doc(appointmentDetails.id).update(appointmentDetails);
  }

  delete(id: any): Promise<any>
  {
   return this.firestore.collection(this.collectionName).doc(id).delete()
  
  }

  saveAppoinment(appointmentDetails: AppointmentItems)
  {
     if(appointmentDetails.id == null)
     {
      return this.firestore.collection(this.collectionName).add({
    createdAt: appointmentDetails.createdAt,
    patientsName: appointmentDetails.patientsName,
    doctorsName: appointmentDetails.doctorsName,
    phoneNumber: appointmentDetails.phoneNumber,
    hospitalName: appointmentDetails.hospitalName,
    date: appointmentDetails.date,
    status: appointmentDetails.status
      });
     } else {
      return this.firestore.collection(this.collectionName).doc(appointmentDetails.id).update({
        patientsName: appointmentDetails.patientsName,
        doctorsName: appointmentDetails.doctorsName,
        phoneNumber: appointmentDetails.phoneNumber,
        status: appointmentDetails.status
      })
     }
  }
}
