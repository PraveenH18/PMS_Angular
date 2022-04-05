import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminService } from '../../services/admin.service';

import { DiaglogformComponent } from '../diaglogform/diaglogform.component';
import { ToastrService } from 'ngx-toastr';
export interface procedure{
  code: string;
  description: string;
  isDeprecated: string;
}
@Component({
  selector: 'app-procedureform',
  templateUrl: './procedureform.component.html',
  styleUrls: ['./procedureform.component.css']
})
export class ProcedureformComponent implements OnInit {

  procedureArr: string[] = ['Yes','No'];
   procedureForm!: FormGroup;
   actionBtn : String ="Save"
   
  constructor(private formBuilder : FormBuilder,
    private dialogRef:MatDialogRef<DiaglogformComponent>,public service:AdminService,
    @Inject(MAT_DIALOG_DATA) public editData: any,private toasterService:ToastrService){}

    public hasError = (controlName: string, errorName: string) =>{
      return this.procedureForm.controls[controlName].hasError(errorName);
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    procedureCode: FormControl = new FormControl('', Validators.required);
    procedureDescription: FormControl = new FormControl('', Validators.required);
    deprecated: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.procedureForm =  this.formBuilder.group({
      procedureCode: this.procedureCode,
      procedureDescription: this.procedureDescription,
      deprecated:  this.deprecated
    });
    this.deprecated.setValue('No');
    if (this.editData) {
      this.actionBtn = "Update"
      let isDeprecated = this.editData.deprecated;
      console.log(this.editData);
      this.procedureCode.disable();
      this.procedureForm.controls['procedureCode'].setValue(this.editData.procedureCode);
      this.procedureForm.controls['procedureDescription'].setValue(this.editData.procedureDescription);
      if (isDeprecated)
        this.procedureForm.controls['deprecated'].setValue('Yes');
      else
        this.procedureForm.controls['deprecated'].setValue('No');
    }
    }
  

  addProcedure() {
    
        if (this.procedureForm.valid) {
          let deprecatedValue = false;
          if (this.deprecated.value == 'Yes') {
            deprecatedValue = true;
          }
          let procedureDto = {
            "procedureCode": this.procedureCode.value,
            "procedureDescription": this.procedureDescription.value,
            "deprecated": deprecatedValue
          }
          this.service.postProcedures(procedureDto).subscribe({
            next:
              (response) => {
                if(this.editData){
                  this.toasterService.success("Procedure updated Successfully");
                  const updateProcedure = {
                    "procedureCode": this.procedureCode.value,
                    "procedureDescription": this.procedureDescription.value,
                    "deprecated": deprecatedValue,
                    "action": "update"
                  }
                  this.dialogRef.close(updateProcedure);
                }else{
                  this.toasterService.success("Procedure added Successfully")
                  const newProcedure = {
                    "procedureCode": this.procedureCode.value,
                    "procedureDescription": this.procedureDescription.value,
                    "deprecated": deprecatedValue,
                    "action": "save"
                  }
                  console.log(newProcedure);
                  this.dialogRef.close(newProcedure);
                }
                
              },
            error: () => {
              this.toasterService.error("Something went wrong")
            }
          })
        }
    
      }
    }
    
      
