import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HospitaluserService } from '../../services/hospitaluser.service';

@Component({
  selector: 'app-all-patient',
  templateUrl: './all-patient.component.html',
  styleUrls: ['./all-patient.component.css']
})
export class AllPatientComponent implements OnInit {

  displayedColumns: string[] = ['patientId','patientName','contactNo','age','gender','action'];
  dataSource !: MatTableDataSource<any>;
  formattedArray:any[]=[];
  constructor(private hospitalUserService:HospitaluserService,private toastr:ToastrService) { }

  ngOnInit(): void {
      this.hospitalUserService.getAllPatient().subscribe({
      next: (res) => {
        res.map(element=>{
          let patientObj={
            "patientId":element.patient.user.userId,
            "patientName":element.patient.title +". "+ element.patient.firstName +" "+element.patient.lastName,
            "contactNo":element.patient.contactNumber,
            "age":element.patient.age,
            "gender":element.patient.gender,
          };
          this.formattedArray.push(patientObj);
        });
        this.dataSource = new MatTableDataSource(this.formattedArray);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error("Server Error");
      }
    })
  }

  @ViewChild('paginator') paginator!: MatPaginator

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
