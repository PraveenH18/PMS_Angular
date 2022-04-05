import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitaluserService } from '../services/hospitaluser.service';

@Component({
  selector: 'app-patient-visit-register',
  templateUrl: './patient-visit-register.component.html',
  styleUrls: ['./patient-visit-register.component.css']
})
export class PatientVisitRegisterComponent implements OnInit {

  fetchAppointment: any = "";
  clickedTab: string = "details";
  isNotesSumitted: boolean = false;
  idPresent: boolean = false;
  physicianNotes: FormControl = new FormControl('', Validators.required);
  visitId: string = "";
  otherTabDisabled: boolean = true;
  pageTitle:string="";

  constructor(private route: ActivatedRoute, private router: Router,
    private dbService: HospitaluserService, private toastr: ToastrService
    ,private dateCase:DatePipe,private titleCase:TitleCasePipe) {
  }
  closeVisit_click() {
    this.dbService.updateAppointment(this.fetchAppointment.appointmentId).subscribe(
      (response) => {
        this.idPresent = false;
        this.fetchAppointment.status = 'closed'
        this.toastr.success("Visit Closed Successfully");
        this.router.navigate(['/hospitaluser/appointment']);
        this.physicianNotes.disable();
      },
      (error) => {
        console.log(error);
        this.toastr.error("Error Occured While Saving Procedure Details");
      }
    );
    this.idPresent = false;
    this.fetchAppointment.status = 'closed'
  }

  physicianNote_click() {
    if (this.physicianNotes.valid) {
      const physicianNoteDto = {
        "visitId": this.visitId,
        "notes": this.physicianNotes.value
      }
      this.dbService.submitPhysicanNotes(physicianNoteDto).subscribe(
        (response) => {
          this.toastr.success(response.message);
          this.isNotesSumitted = true;
          this.physicianNotes.disable();
        }
      );
    } else {
      this.toastr.error("Please Add Some Notes")
    }
  }
  physicianNoteEdit_click() {
    this.physicianNotes.enable();
    this.isNotesSumitted = false;
  }
  vitalSubmit_parent(isVitalSubmitted: boolean) {
    if (isVitalSubmitted) {
      this.otherTabDisabled = false;
    }
  }

  ngOnInit(): void {
    this.visitId = this.route.snapshot.params["visit_id"];
    this.dbService.getAppointment(this.visitId).subscribe(
      (response) => {
        console.log(response);
        this.fetchAppointment = response;
        const patientName=this.titleCase.transform(this.fetchAppointment.patient.patient.title+ " "+this.fetchAppointment.patient.patient.firstName+ " "+this.fetchAppointment.patient.patient.lastName)
        const appointmentDate=this.dateCase.transform(this.fetchAppointment.dateOfAppointment,"d MMM,y")
          this.pageTitle=patientName+ " "+appointmentDate+ " Visit Form";
        this.idPresent = true;
      }, (error) => {
        if (error.status == 404 || error.status == 400) {
          this.toastr.error(error.error.message);
        }
        if (error.status == 500) {
          this.toastr.error(error.error.message);
        }
      }
    );

  
    this.dbService.getPhysicanNotes(this.visitId).subscribe(
      (notesDto) => {
        if (notesDto.notes != null) {
          this.physicianNotes.setValue(notesDto.notes);
          this.physicianNotes.disable();
          this.isNotesSumitted = true;
        } else {
          this.physicianNotes.enable();
          this.isNotesSumitted = false;
        }
      }
    );
  }

  activeState(tab: string) {
    this.clickedTab = tab;
  }

}
