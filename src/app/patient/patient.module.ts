import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { SharedModule } from '../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';
import { ViewPatientDetailsComponent } from './view-patient-details/view-patient-details.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientVisitDetailsComponent } from './patient-visit-details/patient-visit-details.component';
import { AllergyDetailsComponent } from './allergy-details/allergy-details.component';
import { PatientNavComponent } from './patient-nav/patient-nav.component';
import { AppointmentComponent } from './appointment/appointment/appointment.component';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleAllModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

import { VitalsignComponent } from './vitalsigns/vitalsigns.component';
import { DiagnosisPComponent } from './diagnosis/diagnosis.component';
import { ProcedurePComponent } from './procedure/procedure.component';
import { MedicationPComponent } from './medication/medication.component';
import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';


@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientDetailsComponent,
    ViewPatientDetailsComponent,
    PatientHistoryComponent,
    PatientVisitDetailsComponent,
    AllergyDetailsComponent,
    PatientNavComponent, AppointmentComponent,
    PatientDashboardComponent,
    PatientDetailsComponent,
    ViewPatientDetailsComponent,
    PatientHistoryComponent,
    PatientVisitDetailsComponent,
    AllergyDetailsComponent,
    PatientNavComponent,
    VitalsignComponent,
    DiagnosisPComponent,
    ProcedurePComponent,
    MedicationPComponent,
    PatientHomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule,
    ScheduleModule
  ],
  providers: [DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService]

})
export class PatientModule { }
