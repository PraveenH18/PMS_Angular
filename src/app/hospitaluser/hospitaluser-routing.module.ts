import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../service/auth-guard.service";
import { PatientMedicalHistoryComponent } from "./patient-medical-history/patient-medical-history.component";
import { PatientVisitDetailsComponent } from "./patient-visit-details/patient-visit-details.component";
import { PatientVisitRegisterComponent } from "./patient-visit-register/patient-visit-register.component";
import { ViewPatientComponent } from "./patient/view-patient/view-patient.component";
import { ProviderDashboardComponent } from "./provider-dashboard/provider-dashboard.component";
import { UpcomingAppointmentComponent } from "./upcoming-appointment/upcoming-appointment.component";
import { AllPatientComponent } from "./patient/all-patient/all-patient.component";

const routes: Routes = [
  {
    path: '', component: ProviderDashboardComponent,
    children: [
      {path: '', component: UpcomingAppointmentComponent,pathMatch:'full',canActivate:[AuthGuardService]},
      {path: 'appointment', component: UpcomingAppointmentComponent,canActivate:[AuthGuardService]},
      {path: 'patient-visit', component: PatientVisitRegisterComponent,canActivate:[AuthGuardService]},
      {path: 'patient-visit/:visit_id', component: PatientVisitRegisterComponent, canActivate: [AuthGuardService]},
      {path: 'patienthistory', component: PatientMedicalHistoryComponent,canActivate:[AuthGuardService]},
      {path: 'patientvisitdetails/:appointmentId', component: PatientVisitDetailsComponent,canActivate:[AuthGuardService]},
      {path: 'patient-details/:patientId', component: ViewPatientComponent,canActivate:[AuthGuardService]},
      {path: 'patients', component: AllPatientComponent,canActivate:[AuthGuardService]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalUserRoutingModule { }
