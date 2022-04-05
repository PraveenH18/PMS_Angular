import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-diaglogform',
  templateUrl: './diaglogform.component.html',
  styleUrls: ['./diaglogform.component.css']
})
export class DiaglogformComponent implements OnInit {

  deprecatedArr: string[] = ['Yes', 'No'];
  diagnosisForm !: FormGroup;
  actionBtn: String = "Save"

  public hasError = (controlName: string, errorName: string) => {
    return this.diagnosisForm.controls[controlName].hasError(errorName);
  }



  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DiaglogformComponent>, public service: AdminService, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData: any, private toasterService: ToastrService) { }

  diagnosisCode: FormControl = new FormControl('', Validators.required);
  diagnosisDescription: FormControl = new FormControl('', Validators.required);
  deprecated: FormControl = new FormControl('', Validators.required);


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.diagnosisForm = this.formBuilder.group({
      diagnosisCode: this.diagnosisCode,
      diagnosisDescription: this.diagnosisDescription,
      deprecated: this.deprecated
    });
    this.deprecated.setValue('No');
    if (this.editData) {
      this.actionBtn = "Update"
      let isDeprecated = this.editData.deprecated;
      console.log(this.editData);
      this.diagnosisCode.disable();
      this.diagnosisForm.controls['diagnosisCode'].setValue(this.editData.diagnosisCode);
      this.diagnosisForm.controls['diagnosisDescription'].setValue(this.editData.diagnosisDescription);
      if (isDeprecated)
        this.diagnosisForm.controls['deprecated'].setValue('Yes');
      else
        this.diagnosisForm.controls['deprecated'].setValue('No');
    }
  }

  addDiagnosis() {
    if (this.diagnosisForm.valid) {
      let deprecatedValue = false;
      if (this.deprecated.value == 'Yes') {
        deprecatedValue = true;
      }
      let diagnosisDto = {
        "diagnosisCode": this.diagnosisCode.value,
        "diagnosisDescription": this.diagnosisDescription.value,
        "deprecated": deprecatedValue
      }
      this.service.postDiagnosis(diagnosisDto).subscribe({
        next:
          (response) => {
            if(this.editData){
              this.toasterService.success("Diagnosis updated Successfully");
              const updateDiagnosis={
                "diagnosisCode": this.diagnosisCode.value,
                "diagnosisDescription": this.diagnosisDescription.value,
                "deprecated": deprecatedValue,
                "action":"update"
              }
              this.dialogRef.close(updateDiagnosis);
            }else{
         
              this.toasterService.success("Diagnosis added Successfully");
              const newDiagnosis={
                "diagnosisCode": this.diagnosisCode.value,
                "diagnosisDescription": this.diagnosisDescription.value,
                "deprecated": deprecatedValue,
                "action":"save"
              }
            console.log(newDiagnosis);
              this.dialogRef.close(newDiagnosis);
            }
            
          },
        error: () => {
          this.toasterService.error("Something went wrong")
        }
      })
    }

  }
}
