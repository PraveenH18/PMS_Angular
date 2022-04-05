import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientDetails } from '../model/PatientDetails';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  showProfileOptions:boolean=false;
  userRole: string | null = sessionStorage.getItem("role");
  userId: number = JSON.parse(sessionStorage.getItem('user_id') || '{}');
  userName:string="";
  patientImg:string="../../../assets/examination.png";

   
  @ViewChild('drawer') 
  drawer!:MatDrawer ;
  
  constructor(private patientService:PatientService,private toastrService:ToastrService,private router:Router) { }

  
  ngAfterViewInit(): void {
    this.drawer.toggle();
  }
  ngOnInit(): void {
    if (this.userRole) {
      const role = this.userRole;
     
        this.patientService.getPatientRegDetailsById(this.userId).subscribe(
          (response) => {
            const patient = JSON.stringify(response);
            window.sessionStorage.setItem("patient", patient);
             this.userName=response.firstName;
          },
          (error) => {
            this.toastrService.error("Patient not found")
          }
        );    
    }
   
    this.patientService.getPatientDemographicById(this.userId).subscribe((response:PatientDetails)=>{
            this.router.navigate(['/patient']);
    },(error:any)=>{
      this.router.navigate(['/patient/demo']);
      this.toastrService.info("Please fill in your demograhic and allergy details");
    });
  }

}
