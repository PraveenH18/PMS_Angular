import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProviderRegisterationComponent } from './provider-registeration/provider-registeration.component';
import { HospitaluseraccountmanagementComponent } from './accountmanagement/hospitaluseraccountmanagement/hospitaluseraccountmanagement.component';
import { PatientuseraccountmanagementComponent } from './accountmanagement/patientuseraccountmanagement/patientuseraccountmanagement.component';
import { HospitaluserDetailsComponent } from './userdetails/hospitaluser-details/hospitaluser-details.component';
import { DiagnosisdataComponent } from './masterdatamanagement/diagnosisdata/diagnosisdata.component';
import { MedicationdataComponent } from './masterdatamanagement/medicationdata/medicationdata.component';
import { ProceduresdataComponent } from './masterdatamanagement/proceduresdata/proceduresdata.component';
import { ProcedureformComponent } from './masterdatamanagement/procedureform/procedureform.component';
import { MedicationformComponent } from './masterdatamanagement/medicationform/medicationform.component';
import { DiaglogformComponent } from './masterdatamanagement/diaglogform/diaglogform.component';
import { BooleanPipe } from './masterdatapipe/boolean.pipe';
import { PatientuserDetailsComponent } from './userdetails/patientuser-details/patientuser-details/patientuser-details.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminDashHomeComponent } from './admin-dash-home/admin-dash-home.component';





@NgModule({
  declarations: [
    ProviderRegisterationComponent,
    HospitaluseraccountmanagementComponent,
    PatientuseraccountmanagementComponent,
    HospitaluserDetailsComponent,
    DiagnosisdataComponent,
    MedicationdataComponent,
    ProceduresdataComponent,
    ProcedureformComponent,
    MedicationformComponent,
    DiaglogformComponent,
    BooleanPipe,
    PatientuserDetailsComponent,
    AdminDashComponent,
    AdminDashHomeComponent,
 

   
    

  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],

})
export class AdminModule {

}
