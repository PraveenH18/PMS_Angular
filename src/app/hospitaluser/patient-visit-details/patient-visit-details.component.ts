import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitaluserService } from 'src/app/hospitaluser/services/hospitaluser.service';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {

  fetchAppointment: any = "";
  clickedTab: string = "details";
  idPresent: boolean = false;
  appointmentId: any = "";
  message: string = "";
  physicianNotes: FormControl = new FormControl('', Validators.required);
  isNotesAvailable:boolean=false;
  otherTabDisabled: boolean = true;
  pageTitle:string="";

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
    private dbService: HospitaluserService,private titleCase:TitleCasePipe,private dateCase:DatePipe) { }

  showUserOptions: boolean = false;

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.params['appointmentId'];

    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('appointmentId');
      console.log("AppointmentId:  "+this.appointmentId); 
      this.fetchDetails(this.appointmentId);     
    });
  }

  fetchDetails(appointmentId: any) {
    this.idPresent = false;
    if (this.appointmentId) {
      this.dbService.getAppointment(this.appointmentId).subscribe(
        (response) => {
          console.log(response);
          this.fetchAppointment = response;
          const patientName=this.titleCase.transform(this.fetchAppointment.patient.patient.title+ " "+this.fetchAppointment.patient.patient.firstName+ " "+this.fetchAppointment.patient.patient.lastName)
          const appointmentDate=this.dateCase.transform(this.fetchAppointment.dateOfAppointment,"d MMM,y")
          this.pageTitle=patientName+ " "+appointmentDate+ " Visit Details";
         
          this.message = "";
          this.idPresent = true;
          //  this.router.navigate(['/hospitaluser/patient-visit',this.visitId.value]);
        }, (error) => {
          if (error.status == 404 || error.status == 400) {
            this.toastr.error(error.error.message);
          }
          if (error.status == 500) {
            this.toastr.error(error.error.message);
          }
        }
      );

      this.dbService.getPhysicanNotes(this.appointmentId).subscribe(
        (notesDto) => {
          if (notesDto.notes != null) {
            this.physicianNotes.setValue(notesDto.notes);
            this.isNotesAvailable=true;
            this.physicianNotes.disable();
          } else {
            this.isNotesAvailable=false;
            this.physicianNotes.disable();
          }
        }
      );

    }
  }
}


