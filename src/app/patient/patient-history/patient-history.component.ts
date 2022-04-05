import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../services/patient.service';

export interface PatientElement {
  srNo: number;
  visitId: number;
  appointmentDate: string;
  physicianName: string;
}

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})

export class PatientHistoryComponent implements OnInit {

  displayedColumns: string[] = ['appointmentTitle', 'appointmentId', 'dateOfAppointment', 'physicianName', 'action'];
  dataSource !: MatTableDataSource<any>;

  constructor(private patientService: PatientService) { }

  private patientId: number = JSON.parse(sessionStorage.getItem('user_id') || '{}');
  PatientHistoryList: any[] = []

  ngOnInit(): void {
    this.patientService.getPatientHistory(this.patientId).subscribe(
      (response: any) => {
        response.map((element:any)=>{
          let patientObj={
            "appointmentTitle":element.appointmentTitle,
            "appointmentId":element.appointmentId,
            "dateOfAppointment":element.dateOfAppointment,            
            "physicianName":element.physician.employee.title +". "+ 
                element.physician.employee.firstName +" "+
                element.physician.employee.lastName
          };
          this.PatientHistoryList.push(patientObj);
        });
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
      
    //   {
    //   next: (res) => {

    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   error: (err) => {
    //     alert("Error")
    //   }
    // })
  }

  @ViewChild('paginator') paginator!: MatPaginator

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickedRows = new Set<PatientElement>();
}
