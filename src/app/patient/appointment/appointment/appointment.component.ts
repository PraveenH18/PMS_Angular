import { L10n } from '@syncfusion/ej2-base';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  EventSettingsModel, DayService, WeekService, WorkWeekService, EventRenderedArgs, MonthService, ActionEventArgs,
  EventFieldsMapping, TimelineViewsService, AgendaService, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentDetails } from '../../../hospitaluser/model/AppointmentDetails';
import { AppointmentService } from '../../../hospitaluser/services/appointment.service';
import { EditHistoryComponent } from 'src/app/shared/edit-history/edit-history.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditReasonComponent } from 'src/app/shared/edit-reason/edit-reason.component';
import { WaitDailogComponent } from 'src/app/shared/wait-dailog/wait-dailog.component';



L10n.load({
  'en-US': {
    'schedule': {
      'newEvent': 'New Appointment', //to change the name of the 
      //New Event to New Appointment we use L10n class
      'editEvent': 'Edit Appointment'

    }
  }
});
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public physicians: any[] = [];
  public speciality:any[]=[];
  public statusData: string[] = ['ACCEPTED', 'PENDING'];
  public appointmentData: any[] = [];
  constructor(private toastr: ToastrService,
    private schddulerService: AppointmentService, public datepipe: DatePipe,
    private titleCase: TitleCasePipe,private dialogRef:MatDialog) {
      this.schddulerService.getAllPhysician().subscribe(
        (response)=>{
          console.log(response);
          this.physicians=response;
          this.speciality=this.physicians.map(data=>data.specialization)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });;

        },
        (error)=>{
          this.toastr.error("Error While Fetching All Physician Details")
        }
      );



  }

  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;
  public selectedDate: Date = new Date();
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public showQuickInfo: Boolean = false;
  public enableCalendar: boolean = true;
  public creatorName: string = '';
  public reason:string='';
  public creatorId: number = JSON.parse(sessionStorage.getItem('user_id') || '{}');
  public userRole = sessionStorage.getItem("role");

  public eventSettings: EventSettingsModel = {
    dataSource: this.appointmentData,
    fields: {
      subject: { name: 'Subject', validation: { required: true } },
      description: {
        name: 'PatientId', validation: {
          required: true,
          regex: ['^[0-9]*$', 'Number only allowed in this field']
        }
      },
      location: {
        name: 'Description', validation: {
          required: true, minLength: 5, maxLength: 600
        }
      },
      startTime: { name: 'StartTime', validation: { required: true } },
      endTime: { name: 'EndTime', validation: { required: true } }
    }
  };
  public physicianNameList: string[] = [];
  public specialization: FormControl = new FormControl("", Validators.required);
  public physicianName: FormControl = new FormControl("", Validators.required);
  public physicianId: FormControl = new FormControl();
  public physicianDetailForm: FormGroup = new FormGroup({
    specialzation: this.specialization,
    physicianName: this.physicianName,
    physicianId: this.physicianId
  });

  ngOnInit(): void {
    if (this.userRole == 'patient') {
      let role=this.titleCase.transform(this.userRole);
      const patientStr: string | null = sessionStorage.getItem("patient");
      if (patientStr) {
        const patient = JSON.parse(patientStr);
        this.creatorName = patient.title + " " + patient.firstName + " " + patient.lastName+"( "+role+" )";
        this.physicianId.disable();
        this.physicianName.disable();
      }

    }
  }

  public getStatus(status: String) {
    if (status == null) {
      return 'PENDING';
    } else {
      return status;
    }
  }

  public openEditHistory(appointmentId:number){
  
    this.scheduleObj.refresh();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width='auto';
    this.schddulerService.getAppointmentEditHistory(appointmentId).subscribe(
      (response)=>{
        dialogConfig.data=response;
        this.dialogRef.open(EditHistoryComponent,dialogConfig)
      }
    );
  }

  public specialization_click() {
    this.physicianName.enable();
    let filteredPhysicians = this.physicians.filter(data => data.specialization.toLowerCase() == this.specialization.value.toLowerCase());
    if (filteredPhysicians.length == 1) {
      this.physicianId.setValue(filteredPhysicians[0].physicianId);
      this.physicianName.setValue(this.titleCase.transform(filteredPhysicians[0].physicianName));
      this.physicianName.disable();
      this.physicianId.disable();
    } else {
      this.physicianNameList = [];
      filteredPhysicians.forEach(physician => {
        this.physicianNameList.push(physician.physicianName);
        this.physicianId.setValue("");
        this.physicianName.setValue("");
      })
    }

  }

  public physicianName_click() {
    let selectedPhysician = this.physicians.filter(data =>
      data.specialization.toLowerCase() == this.specialization.value.toLowerCase()
      && data.physicianName.toLowerCase() == this.physicianName.value.toLowerCase());
    this.physicianId.setValue(selectedPhysician[0].physicianId);
  }

  public getSchedule_click() {
    this.physicianDetailForm.markAllAsTouched();
    if (this.physicianDetailForm.valid) {
      this.getAllAppointmentsOfPhysician();
     
    }
  }

  public getAllAppointmentsOfPhysician(){
    this.enableCalendar = false;
    this.schddulerService.getAppointmentsOfPhysician(this.physicianId.value).subscribe(
      (response) => {
        console.log(response);
        this.appointmentData=[];
        for(let i=0;i<response.length;i++){
          let appointment:any={};
          if(response[i].patientId!=this.creatorId){
            appointment={
              "Id": response[i].id,
              "CreatorName": response[i].creatorName,
              "Subject": "Not Avaiable",
              "Status": "NOT_AVAILABLE",
              "StartTime": new Date(response[i].startTime),
              "PatientId": response[i].patientId,
              "EndTime": new Date(response[i].endTime),
              "Description": "",
              "IsBlock":true,
              "IsReadonly": true
            }
          }else{
            appointment={
              "Id": response[i].id,
              "CreatorName": response[i].creatorName,
              "Subject": response[i].subject,
              "Status": response[i].status,
              "StartTime": new Date(response[i].startTime),
              "PatientId": response[i].patientId,
              "EndTime": new Date(response[i].endTime),
              "Description": response[i].description,
              "IsBlock": response[i].block,
              "IsReadonly": response[i].readonly,
              "IsEdited":response[i].edited
            }
          }
           
          this.appointmentData.push(appointment);
        }
     
        this.scheduleObj.eventSettings.dataSource = this.appointmentData;
        this.scheduleObj.refresh();
        
      });
  }

  public dateParser(data: string) {
    return new Date(data);
  }


  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data['Status']) {
      case 'PENDING':
        (args.element as HTMLElement).style.backgroundColor = 'rgb(250, 174, 33)';
        break;
      case 'ACCEPTED':
        (args.element as HTMLElement).style.backgroundColor = 'rgb(58, 221, 58)';
        break;
      case 'NOT_AVAILABLE':
        (args.element as HTMLElement).style.backgroundColor = 'lightgray';
        break;
    }
  }

  onActionBegin(args: ActionEventArgs) {
    let data: Record<string, any> | Record<string, any>[] | undefined = args.data;

    if (args.requestType === 'eventRemove') {
      let element = ((args.data) as any);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.width='200px';
      let ref= this.dialogRef.open(WaitDailogComponent,dialogConfig);
    
      this.schddulerService.cancelAppointment(element[0].Id).subscribe(
        (response) => {
          const appointmentIndex = this.appointmentData.findIndex(data => data.Id == element.Id);
      this.appointmentData.splice(appointmentIndex, 1);
      this.scheduleObj.eventSettings.dataSource = this.appointmentData;
          this.toastr.success("Appointment Cancelled Successfully");
          this.scheduleObj.refresh();
        },
        (error) => {
          this.toastr.error(error.error.message);
        },()=>{
        ref.close();
      }
      );
      this.scheduleObj.refresh();
      return;
    }

    if ((args.requestType === 'eventCreate' || args.requestType === 'eventChange') && (<Object[]>args.data).length > 0
      || !isNullOrUndefined(<Object>args.data)) {
      let eventData: any = args.data as any;
      let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
      if (eventField.startTime && eventField.endTime) {
        let startDate: Date = (((<Object[]>args.data).length > 0)
          ? eventData[0][eventField.startTime] : eventData[eventField.startTime]) as Date;
        let endDate: Date = (((<Object[]>args.data).length > 0)
          ? eventData[0][eventField.endTime] : eventData[eventField.endTime]) as Date;
        let timeDiff = endDate.valueOf() - startDate.valueOf();
        let durationInHr = timeDiff / (1000 * 3600);
        if (durationInHr < 0) {
          this.scheduleObj.refresh();
          this.toastr.error("End time cannot be less than Start Time");
          return;
        }
        if (durationInHr > 1) {
          this.scheduleObj.refresh();
          this.toastr.error("Appointment Duration Cannot be More than 1hr");
          return;
        }

        args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
        if (args.cancel) {
          this.toastr.error("Selected time slot is not available");
          return;
        }

        if (args.requestType === 'eventCreate') {
          console.log(args.data);
          let element = ((args.data) as { [key: string]: any });
          let newAppointment: AppointmentDetails = this.getAppointmentInstance(element);
          this.schddulerService.createAppointment(newAppointment).subscribe((response) => {
            let appointmentObj=this.getScheduleAppointmentObject(response);
            this.appointmentData.push(appointmentObj);
            this.scheduleObj.eventSettings.dataSource = this.appointmentData;
            this.scheduleObj.refresh();
            this.toastr.success("Appointment Created Successfully");
          },
            (error) => {
              this.toastr.error(error.error.message);
            }
          );
          this.scheduleObj.refresh();
          return;
        }
        if (args.requestType === 'eventChange') {
          let element = ((args.data) as any);
          this.updateAppointment(element);
          
          
        }
      }
    }
  }

  public updateAppointment(element:any){
    
    let updateAppointment: AppointmentDetails = new AppointmentDetails();
    let endTime = this.datepipe.transform(element.EndTime, 'yyyy-MM-dd h:mm a');
    let startTime = this.datepipe.transform(element.StartTime, 'yyyy-MM-dd h:mm a');
    let status=element.Status;
    //Set the status pending if nurse updates the appointment
    if(this.userRole!='physician'){
      status='PENDING';
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width='300px';

    this.dialogRef.open(EditReasonComponent,dialogConfig).afterClosed().subscribe(result => {
    this.reason = result;
    if (endTime != null && startTime != null) {
      updateAppointment.createdById = this.creatorId;
      updateAppointment.creatorName = this.titleCase.transform(this.creatorName);
      updateAppointment.description = element.Description;
      updateAppointment.endTime = endTime;
      updateAppointment.startTime = startTime;
      updateAppointment.id = element.Id;
      updateAppointment.patientId = this.creatorId;
      updateAppointment.physicianId = this.physicianId.value;
      updateAppointment.status = status;
      updateAppointment.subject = element.Subject;
      updateAppointment.edited=true;
      updateAppointment.reason=this.reason;

    }
    this.schddulerService.editAppointment(updateAppointment).subscribe((response) => {
      const appointmentIndex = this.appointmentData.findIndex(data => data.Id == element.Id);
      let appointment=this.getScheduleAppointmentObject(response);
      this.appointmentData.splice(appointmentIndex, 1, appointment);
      this.scheduleObj.eventSettings.dataSource = this.appointmentData;
      this.toastr.success("Appointment Updated Successfully");
      this.scheduleObj.refresh();
    },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
    this.scheduleObj.refresh();
    return;
   });

    
  }
  public getAppointmentInstance(element: any) {
  
    let appointment: AppointmentDetails = new AppointmentDetails();
   
    let endTime = this.datepipe.transform(element[0].EndTime, 'yyyy-MM-dd h:mm a');
    let startTime = this.datepipe.transform(element[0].StartTime, 'yyyy-MM-dd h:mm a');
    if (endTime != null && startTime != null) {
      appointment.createdById = this.creatorId;
      appointment.creatorName = this.titleCase.transform(this.creatorName);
      appointment.description = element[0].Description;
      appointment.endTime = endTime;
      appointment.startTime = startTime;
      appointment.patientId = this.creatorId;
      appointment.physicianId = this.physicianId.value;
      appointment.status = element[0].Status;
      appointment.subject = element[0].Subject;

    }
    return appointment;
  }

  public getScheduleAppointmentObject(appointmentDto:AppointmentDetails){
    let appointment={
      "Id": appointmentDto.id,
      "CreatorName": appointmentDto.creatorName,
      "Subject": appointmentDto.subject,
      "Status": appointmentDto.status,
      "StartTime": new Date(appointmentDto.startTime),
      "PatientId": appointmentDto.patientId,
      "EndTime": new Date(appointmentDto.endTime),
      "Description": appointmentDto.description,
      "IsBlock": appointmentDto.block,
      "IsReadonly": appointmentDto.readonly,
      "IsEdited":appointmentDto.edited
    }
    return appointment;
  }

}
