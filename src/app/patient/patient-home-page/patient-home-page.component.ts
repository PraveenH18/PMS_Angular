import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service'

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.css']
})
export class PatientHomePageComponent implements OnInit {

  appointmentList:any[]=[];
  vitals:any={};
  userId: number = JSON.parse(sessionStorage.getItem('user_id') || '{}');

  constructor(private patientService:PatientService) {
   }

  ngOnInit(): void {
    
    this.patientService.getDashboardDetails(this.userId).subscribe((response)=>{
      if(response.appointment[0]!=null){
        this.appointmentList=response.appointment.filter((data:any)=>data.status!='CLOSED');
        this.appointmentList.map(
          (appointment:any)=>{
            if(appointment.status=='ACCEPTED')
              appointment.color="palegreen";
            else if(appointment.status=='PENDING')
              appointment.color="rgb(247, 247, 111)";
            else if(appointment.status=='CANCELED')
              appointment.color="rgb(252, 85, 56)";
            else
              appointment.color="";
          }
        );
      }
      
      this.vitals=response.vitals;
      console.log(this.vitals)
    });
  
   }

}
