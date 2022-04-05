import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HospitaluserService } from '../services/hospitaluser.service';

@Component({
  selector: 'app-patient-medical-history',
  templateUrl: './patient-medical-history.component.html',
  styleUrls: ['./patient-medical-history.component.css']
})
export class PatientMedicalHistoryComponent implements OnInit {

  displayedColumns: string[] = ['appointmentId','appointmentTitle','patientId','patientName', 'dateOfAppointment', 'physicianName', 'action'];
  dataSource !: MatTableDataSource<any>;

  constructor(private hospitalUserService:HospitaluserService,private toastr:ToastrService) { }
  PatientHistoryList: any[] = []

  ngOnInit(): void {
      this.hospitalUserService.getPatientHistory().subscribe(
              (response: any) => {
            response.map((element:any)=>{
              let patientObj={
                "appointmentId":element.appointmentId,
                "appointmentTitle":element.appointmentTitle,
                "patientId":element.patient.patient.user.userId,
                "patientName":element.patient.patient.title +". "+ element.patient.patient.firstName +" "+ element.patient.patient.lastName,
                "dateOfAppointment":element.dateOfAppointment,            
                "physicianName":element.physician.employee.title+". "+element.physician.employee.firstName +" "+element.physician.employee.lastName,
                    
              };
              this.PatientHistoryList.push(patientObj);
            });
          this.dataSource = new MatTableDataSource(this.PatientHistoryList);
          this.dataSource.paginator = this.paginator;
        });
      }

  @ViewChild('paginator') paginator!: MatPaginator

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
