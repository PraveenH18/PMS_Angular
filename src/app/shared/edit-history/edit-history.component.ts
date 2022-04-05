import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.css']
})
export class EditHistoryComponent {

  constructor(public dialogRef: MatDialogRef<EditHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
     }
  dataSource: any = this.data;
  columnsToDisplay = ['editedBy', 'editedOn','previousDateOfAppointment','previousTimeSlot','currentDateOfAppointment', 'currentTimeSlot', 'reason', 'status'];

  public close_click() {
    this.dialogRef.close();
  }

}


