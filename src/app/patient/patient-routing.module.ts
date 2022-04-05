
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PatientDashboardComponent } from "./patient-dashboard/patient-dashboard.component";
import { PatientDetailsComponent } from "./patient-details/patient-details.component";
import { PatientNavComponent } from "./patient-nav/patient-nav.component";
import { ViewPatientDetailsComponent } from "./view-patient-details/view-patient-details.component";
import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientVisitDetailsComponent } from './patient-visit-details/patient-visit-details.component';
import { AppointmentComponent } from "./appointment/appointment/appointment.component";
import { AuthGuardService } from "../service/auth-guard.service";
//import { PatientVisitRegisterComponent } from "../hospitaluser/patient-visit-register/patient-visit-register.component";

const routes: Routes = [
  {
    path: '', component: PatientDashboardComponent,
    children: [
      { path: '', component: PatientHomePageComponent,pathMatch:'full',canActivate:[AuthGuardService]},
        { path: 'demo', component: PatientNavComponent,canActivate:[AuthGuardService]},
        { path: 'profile', component: ViewPatientDetailsComponent,canActivate:[AuthGuardService]},
        { path: 'patienthistory', component:PatientHistoryComponent,canActivate:[AuthGuardService]},
        { path: 'patientvisitdetails/:appointmentId', component:PatientVisitDetailsComponent,canActivate:[AuthGuardService]},
        { path: 'appointment', component:AppointmentComponent,canActivate:[AuthGuardService]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
