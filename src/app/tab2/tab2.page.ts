import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentItems } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
appointments: any;
appointmentList: any[]
  constructor(private router: Router,
              private appointmentService: AppointmentService
    ) {}

    ngOnInit(){
      this.fetchList();
    }

openForm(): void 
{
 this.router.navigate(['/appointment-page']);
}
statusBadge(appointment: AppointmentItems){
 return  appointment.status ? "success" :  "danger"
// switch(appointmentStatus)
// {
//   case "false":
//   return "bg-dark"

//   case "true":
//   return "bg-success";

//   default:
//     return "bg-warning"

// }
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

}
