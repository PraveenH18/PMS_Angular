import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { UserRoutingModule } from './user-routing.module';
import { DobValidatorDirective } from './patient-registration/dob-validator.directive';



@NgModule({
  declarations: [
    ChangePwdComponent,
    LoginComponent,
    ForgotPwdComponent,
    PatientRegistrationComponent,
    DobValidatorDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  exports:[
    ChangePwdComponent,
    LoginComponent,
    ForgotPwdComponent,
    PatientRegistrationComponent,

  ]
})
export class UserModule { }
