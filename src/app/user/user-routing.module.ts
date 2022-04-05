import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { LoginComponent } from './login/login.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';

const routes: Routes = [
  { path: '',
  children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: PatientRegistrationComponent},
      { path: 'changepassword', component: ChangePwdComponent},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
