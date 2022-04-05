import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceivedNotesComponent } from '../received-notes/received-notes.component';
import { SendNotesComponent } from '../send-notes/send-notes.component';
import { SentNotesComponent } from '../sent-notes/sent-notes.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitaluserService } from '../services/hospitaluser.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit,AfterViewInit {

  showProfileOptions: boolean = false;
  showNotesOptions:boolean=false;
  userRole: string | null = sessionStorage.getItem("role");
  userId: string = JSON.parse(sessionStorage.getItem('user_id') || '{}');
  userName:string="";
  providerImg:string="";
  
  @ViewChild('drawer') 
  drawer!:MatDrawer ;

  constructor(private dataService: HospitaluserService,private router:Router, private toastrService: ToastrService, private dialogRef:MatDialog) { 
   
  }

  ngAfterViewInit(): void {
    this.drawer.toggle();
  }

  ngOnInit(): void {
    if (this.userRole) {
      const role = this.userRole;
      if (role.toLocaleLowerCase() == 'physician') {
        this.dataService.getPhysicianDetails(this.userId).subscribe(
          (response) => {
            const physicianDetails = JSON.stringify(response);
            window.sessionStorage.setItem("physician", physicianDetails);
             this.userName=response.employee.firstName;
            this.providerImg="../../../assets/provider.jfif";
            this.router.navigate(['/hospitaluser/appointment']);
          },
          (error) => {
            this.toastrService.error("Physician not found")
          }
        );
      }else if (role.toLocaleLowerCase() == 'nurse') {
        this.dataService.getNurseDetails(this.userId).subscribe(
          (response) => {
            const nurseDetails = JSON.stringify(response);
            window.sessionStorage.setItem("nurse", nurseDetails);
            this.userName=response.firstName;
            this.providerImg="../../../assets/nurse.jpg";
            this.router.navigate(['/hospitaluser/appointment']);
          },
          (error) => {
            this.toastrService.error("Nurse not found")
          }
        );
      }
    }
    if (!localStorage.getItem('diagnosisData')) {
      this.dataService.getDiagnosisList().subscribe(
        response => {
          const diagnosisData = JSON.stringify(response.slice(0, 2000));
          window.localStorage.setItem("diagnosisData", diagnosisData)
        }
      );
    }
    if (!localStorage.getItem('medicationData')) {
      this.dataService.getMedicationList().subscribe(
        response => {
          const medicationData = JSON.stringify(response.slice(0, 2000));
          window.localStorage.setItem("medicationData", medicationData)
        }
      );
    }
    if (!localStorage.getItem('procedureData')) {
      this.dataService.getProcedureList().subscribe(
        response => {
          const procedureData = JSON.stringify(response.slice(0, 2000));
          window.localStorage.setItem("procedureData", procedureData)
        }
      );
    }

  }

  public openSendNotesDialog():void{
      this.dialogRef.open(SendNotesComponent,{
        maxWidth: '90vw',
        maxHeight: '90vh',
        height: 'auto',
        width: '65%',
        panelClass: 'full-screen-modal'
      });
  }

  public openReceivedNotesDialog():void{
    this.dialogRef.open(ReceivedNotesComponent,{
    // maxWidth: '50vw',
      // maxHeight: '50vh',
      height: 'auto',
      width: 'auto',
      panelClass: 'full-screen-modal'
    });
  }

  public openSentNotesDialog():void{
    this.dialogRef.open(SentNotesComponent,{
      // maxWidth: '50vw',
      // maxHeight: '50vh',
      height: 'auto',
      width: 'auto',
      panelClass: 'full-screen-modal'
    });
  }
  

}
