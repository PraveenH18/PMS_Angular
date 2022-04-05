import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientVisitRegisterComponent } from './patient-visit-register/patient-visit-register.component';
import { VitalsignsComponent } from './vitalsigns/vitalsigns.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { MedicationComponent } from './medication/medication.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { SharedModule } from '../shared/shared.module';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { HospitalUserRoutingModule } from './hospitaluser-routing.module';
import { UpcomingAppointmentComponent } from './upcoming-appointment/upcoming-appointment.component';

import { SendNotesComponent } from './send-notes/send-notes.component';
import { SearchComponent } from './search/search.component';
import { MatTableModule } from '@angular/material/table'  
import { ReceivedNotesComponent } from './received-notes/received-notes.component';
import { SentNotesComponent } from './sent-notes/sent-notes.component';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleAllModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { PatientMedicalHistoryComponent } from './patient-medical-history/patient-medical-history.component';
import { PatientVisitDetailsComponent } from './patient-visit-details/patient-visit-details.component';
import { AllPatientComponent } from './patient/all-patient/all-patient.component';
import { ViewPatientComponent } from './patient/view-patient/view-patient.component';

@NgModule({
  declarations: [
  
    PatientVisitRegisterComponent,
       VitalsignsComponent,
       ProcedureComponent,
       MedicationComponent,
       DiagnosisComponent,
       ProviderDashboardComponent,
       UpcomingAppointmentComponent,
       SendNotesComponent,
       SearchComponent,
       ReceivedNotesComponent,
       SentNotesComponent,
       PatientMedicalHistoryComponent,
       PatientVisitDetailsComponent,
       AllPatientComponent,
       ViewPatientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HospitalUserRoutingModule,
    MatTableModule,
    ScheduleModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService,
    AgendaService,
    MonthAgendaService]
})
export class HospitaluserModule { }
