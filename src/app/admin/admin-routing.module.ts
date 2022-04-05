import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderRegisterationComponent } from './provider-registeration/provider-registeration.component';
import { HospitaluseraccountmanagementComponent } from './accountmanagement/hospitaluseraccountmanagement/hospitaluseraccountmanagement.component'
import { PatientuseraccountmanagementComponent } from './accountmanagement/patientuseraccountmanagement/patientuseraccountmanagement.component';
import { HospitaluserDetailsComponent } from './userdetails/hospitaluser-details/hospitaluser-details.component';
import { DiagnosisdataComponent } from './masterdatamanagement/diagnosisdata/diagnosisdata.component';
import { MedicationdataComponent } from './masterdatamanagement/medicationdata/medicationdata.component';
import { ProceduresdataComponent } from './masterdatamanagement/proceduresdata/proceduresdata.component';
import { DiaglogformComponent } from './masterdatamanagement/diaglogform/diaglogform.component';
import { PatientuserDetailsComponent } from './userdetails/patientuser-details/patientuser-details/patientuser-details.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminDashHomeComponent } from './admin-dash-home/admin-dash-home.component';
import { AuthGuardService} from '../service/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: AdminDashComponent,
    children: [
      {path :'',component:AdminDashHomeComponent,pathMatch:'full',canActivate:[AuthGuardService]},
      { path: 'providerRegistration', component: ProviderRegisterationComponent,canActivate:[AuthGuardService] },
      { path: 'hospitalAccountManagement', component: HospitaluseraccountmanagementComponent,canActivate:[AuthGuardService] },
      { path: 'patientAccountManagement', component: PatientuseraccountmanagementComponent,canActivate:[AuthGuardService] },
      { path: 'hospitaluserdetails/:userId', component: HospitaluserDetailsComponent,canActivate:[AuthGuardService] },
      { path: 'patientdetails/:userId', component: PatientuserDetailsComponent,canActivate:[AuthGuardService] },
      {path : 'diagnosisdata', component:DiagnosisdataComponent,canActivate:[AuthGuardService]},
      {path : 'medicationdata', component:MedicationdataComponent,canActivate:[AuthGuardService]},
      {path : 'proceduresdata', component:ProceduresdataComponent,canActivate:[AuthGuardService]},
      {path : 'diagnosisform/:diagnosis_code',component:DiaglogformComponent,canActivate:[AuthGuardService]}
  ]
    
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
