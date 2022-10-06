import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPagePageRoutingModule } from './appointment-page-routing.module';

import { AppointmentPagePage } from './appointment-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AppointmentPagePageRoutingModule
  ],
  declarations: [AppointmentPagePage]
})
export class AppointmentPagePageModule {}
