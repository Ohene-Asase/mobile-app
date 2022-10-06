import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentItems } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.page.html',
  styleUrls: ['./appointment-page.page.scss'],
})
export class AppointmentPagePage implements OnInit {
  appointmentForm: FormGroup
  appointmentList: any[]
  constructor(private fb : FormBuilder,
             private appointmentService:  AppointmentService
    ) { }

  ngOnInit() {
    this.setupForm();
    this.fetchList();
  }
  
 submitForm(appointment: AppointmentItems): void 
 {
  appointment.createdAt= Date.now();
  appointment.status = false;
  this.appointmentService.createAppointment(appointment).then( resp =>{
    this.appointmentForm.reset();
  })
    .catch(error => {
      console.log(error);
    });
 }

delete(rowID): void
{
  this.appointmentService.delete(rowID)
}

fetchList(){
  this.appointmentService.getAppoinment().onSnapshot((snapshot) => {
    let changes = snapshot.docs;
    this.appointmentList = []
    changes.forEach(change => {
      let list: any = change.data();
      list.id = change.id;
      this.appointmentList.push(list)
      console.log(this.appointmentList)
    })
    this.appointmentList.sort((a,b) => {
      return a.status - b.status
    })
  })
}


// editRecord(recordRow)
// {
//   let record = {};
//   record['patientName'] = recordRow.patientName;
//   record['doctorsName'] = recordRow.doctorsName;
//   record['phoneNumber'] = recordRow.phoneNumber;
//   record['date'] = recordRow.date;
//   this.appointmentService.update(recordRow.id, record);
  
// }
  setupForm(): void
  {
   this.appointmentForm = this.fb.group({
    patientName: ['', Validators.required],
    doctorsName: ['', Validators.required],
    phoneNumber: ['',  Validators.required],
    hospitalName: ['',Validators.required],
    date:['', Validators.required]

   })
   
  }
}
