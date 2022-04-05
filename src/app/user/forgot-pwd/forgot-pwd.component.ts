import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaitDailogComponent } from 'src/app/shared/wait-dailog/wait-dailog.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  email = new FormControl("", [Validators.required, Validators.email]);
  errorMessage:string="";
  successMessage:string="";

  showButton:boolean=true;
  constructor(
    public dialogRef: MatDialogRef<ForgotPwdComponent>,private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,private userService:UserService ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit_click(){

    const forgotPasswordDto={
      "emailId":this.email.value,
      "password":""
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width='200px';
    const ref = this.dialog.open(WaitDailogComponent,dialogConfig);
  
    this.userService.forgotPasswordRequest(forgotPasswordDto).subscribe(
      (response)=>{
        this.successMessage="New password mailed to your registered email address";
        this.showButton=false;
      },
      (error)=>{
        this.errorMessage=error.error.message;
      },()=>{
        ref.close();
      }
    );
    
  }
  ngOnInit() {
  }

}
