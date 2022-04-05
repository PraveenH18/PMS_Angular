import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { DiaglogformComponent } from '../diaglogform/diaglogform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { MatSort } from '@angular/material/sort';


export interface DiagnosisData {
  code: string;
  description: string;
  isDeprecated: string;
}
@Component({
  selector: 'app-diagnosisdata',
  templateUrl: './diagnosisdata.component.html',
  styleUrls: ['./diagnosisdata.component.css']
})
export class DiagnosisdataComponent implements OnInit {

  dataSource: any = [];
  diagnosisData: any[] = [];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  columnsToDisplay = ['diagnosis_code', 'diagnosis_description', 'is_deprecated', 'action'];


  constructor(private service: AdminService, public dialog: MatDialog, private toasterService: ToastrService) { }

  ngOnInit() {
    this.service.getDiagnosis().subscribe((response: any) => {
      this.diagnosisData = response;
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
    this.dialog.open(DiaglogformComponent, {
      width: 'auto',
      height: 'auto',
    }).afterClosed().subscribe(response => {
      if (response.action == 'save') {
        const newDiagnosis = {
          "diagnosisCode": response.diagnosisCode,
          "diagnosisDescription": response.diagnosisDescription,
          "deprecated": response.deprecated
        };
        this.diagnosisData.push(newDiagnosis);
        this.dataSource = new MatTableDataSource(this.diagnosisData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });

  }

  editDiagnosis(row: any) {
    this.dialog.open(DiaglogformComponent, {
      width: 'auto',
      height: 'auto',
      data: row
    }).afterClosed().subscribe(response => {
      if (response.action == 'update') {
        const updateDiagnosis = {
          "diagnosisCode": response.diagnosisCode,
          "diagnosisDescription": response.diagnosisDescription,
          "deprecated": response.deprecated
        };
        let index = this.diagnosisData.findIndex(data => response.diagnosisCode == data.diagnosisCode);
        this.diagnosisData.splice(index, 1, updateDiagnosis);
        this.dataSource = new MatTableDataSource(this.diagnosisData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });

  }


}

