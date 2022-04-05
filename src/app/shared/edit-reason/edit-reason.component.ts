import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-reason',
  templateUrl: './edit-reason.component.html',
  styleUrls: ['./edit-reason.component.css']
})
export class EditReasonComponent implements OnInit {

  public reason:FormControl=new FormControl("",Validators.required);

  constructor(public dialogRef: MatDialogRef<EditReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  public submit_click(){
    this.reason.markAsTouched();
    if(this.reason.valid){
      this.dialogRef.close(this.reason.value);
    }
  }
  ngOnInit(): void {
  }

}
