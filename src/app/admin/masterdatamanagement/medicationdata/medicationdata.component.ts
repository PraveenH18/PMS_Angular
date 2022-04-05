import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MedicationformComponent } from '../medicationform/medicationform.component';
import { AdminService } from '../../services/admin.service';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

export interface MedicationData{
  drugCode: string;
  drugName:string;
  drugForm:string;
  drugStrength:string;
  drugGenericName:string;
  drugBrandName:string;
}
@Component({
  selector: 'app-medicationdata',
  templateUrl: './medicationdata.component.html',
  styleUrls: ['./medicationdata.component.css']
})
export class MedicationdataComponent implements OnInit {

  dataSource: any = [];
  medicationData:any[]=[];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  columnsToDisplay = ['drugCode', 'drugName', 'drugForm', 'drugStrength','action'];
  
  
  constructor(private service: AdminService,public dialog: MatDialog,private toasterService:ToastrService) {}

  ngOnInit() {
    this.service.getMedications().subscribe((response: any) => {
      this.medicationData=response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog() {
    this.dialog.open(MedicationformComponent,{
      width:'auto',
      height: 'auto',
     }).afterClosed().subscribe(response => {
      if (response.action == 'save') {

        const newMedication = {

          "drugCode": response.drugCode,

          "drugName": response.drugName,

          "drugForm": response.drugForm,
          "drugStrength": response.drugStrength
          

        };
        
        this.medicationData.push(newMedication);



        console.log(this.medicationData);

        this.dataSource = new MatTableDataSource(this.medicationData);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      }

    });

  }
  
  editMedication(row: any){
    this.dialog.open(MedicationformComponent,{
      width:'auto',
      height: 'auto',
      data: row
    }).afterClosed().subscribe(response=>{
      
      if (response.action == 'update') {

        const updateMedication = {

          "drugCode": response.drugCode,

          "drugName": response.drugName,

          "drugForm": response.drugForm,
          "drugStrength": response.drugStrength

        };

        let index = this.medicationData.findIndex(data => response.drugCode == data.drugCode);

        this.medicationData.splice(index, 1, updateMedication);

        console.log(updateMedication)

        this.dataSource = new MatTableDataSource(this.medicationData);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      }

    });

  }


}