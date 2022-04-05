import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { ProcedureformComponent } from '../procedureform/procedureform.component';



export interface ProcedureData{
  code: string;
  description: string;
  isDeprecated: string;
}
@Component({
  selector: 'app-proceduresdata',
  templateUrl: './proceduresdata.component.html',
  styleUrls: ['./proceduresdata.component.css']
})
export class ProceduresdataComponent implements OnInit {

  dataSource: any = [];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  columnsToDisplay = ['procedureCode', 'procedureDescription', 'isDeprecated','action'];
  
  procedureData:any[]=[];
  constructor(private service: AdminService,private dialog: MatDialog,private toasterService: ToastrService) {}

  ngOnInit() {
    this.service.getProcedures().subscribe((response: any) => {
      this.procedureData = response;
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
    const dialog = this.dialog.open(ProcedureformComponent,{
      width:'auto',
      height: 'auto',
    }).afterClosed().subscribe(response => {

      if (response.action == 'save') {

        const newProcedure = {

          "procedureCode": response.procedureCode,

          "procedureDescription": response.procedureDescription,

          "deprecated": response.deprecated

        };

        this.procedureData.push(newProcedure);



        console.log(this.procedureData);

        this.dataSource = new MatTableDataSource(this.procedureData);

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      }

    });

  }

    

 
  
    editProcedure(row: any){
      this.dialog.open(ProcedureformComponent,{
        width:'auto',
        height: 'auto',
        data: row
      }).afterClosed().subscribe(response=>{
        if(response.action=='update'){
          
          const updateProcedure={
            "procedureCode": response.procedureCode,
            "procedureDescription": response.procedureDescription,
            "deprecated": response.deprecated
          };
         let index= this.procedureData.findIndex(data=>response.procedureCode==data.procedureCode);
         this.procedureData.splice(index,1,updateProcedure);
          console.log(updateProcedure)
          this.dataSource = new MatTableDataSource(this.procedureData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }



      })
  
    }
  
    }




