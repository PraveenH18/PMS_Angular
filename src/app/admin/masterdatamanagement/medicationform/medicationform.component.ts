import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';


export interface medication{
  drugCode: string;
  drugName:string;
  drugForm:string;
  drugStrength:string;
  drugGenericName:string;
  drugBrandName:string;
}
@Component({
  selector: 'app-medicationform',
  templateUrl: './medicationform.component.html',
  styleUrls: ['./medicationform.component.css']
})
export class MedicationformComponent implements OnInit {

  public medicationForm!: FormGroup;
  actionBtn : String ="Save"

  constructor(private formBuilder : FormBuilder,public service:AdminService,public dialogRef: MatDialogRef<MedicationformComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,private toasterService:ToastrService){}

  drugCode: FormControl = new FormControl('', Validators.required);
  drugName: FormControl = new FormControl('', Validators.required);
  drugForm: FormControl = new FormControl('', Validators.required);
  drugStrength: FormControl = new FormControl('', Validators.required);

  public hasError = (controlName: string, errorName: string) =>{
    return this.medicationForm.controls[controlName].hasError(errorName);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit():void {
    this.medicationForm = this.formBuilder.group({
       drugCode: this.drugCode,
      drugName: this.drugName,
      drugForm: this.drugForm,
      drugStrength: this.drugStrength
    });
   
    if(this.editData){
      this.actionBtn = "Update";
      console.log(this.editData);
      this.drugCode.disable();
      this.medicationForm.controls['drugCode'].setValue(this.editData.drugCode);
      this.medicationForm.controls['drugName'].setValue(this.editData.drugName);
      this.medicationForm.controls['drugForm'].setValue(this.editData.drugForm);
      this.medicationForm.controls['drugStrength'].setValue(this.editData.drugStrength);
    }
  }

  addMedication(){
    
    if (this.medicationForm.valid) {
      
    let medicationDto = {
      "drugCode": this.drugCode.value,
      "drugName": this.drugName.value,
      "drugForm": this.drugForm.value,
      "drugStrength": this.drugStrength.value
    }
    this.service.postMedications(medicationDto).subscribe({
      next:
        (response) => {
          if(this.editData){  
            this.toasterService.success("Medication details updated Successfully");
            const updateMedication = {
              "drugCode": this.drugCode.value,
              "drugName": this.drugName.value,
              "drugForm": this.drugForm.value,
              "drugStrength": this.drugStrength.value,
              "action":"update"
            }
            this.dialogRef.close(updateMedication);
          }else{
            this.toasterService.success("Medication added Successfully");
            const newMedication = {
              "drugCode": this.drugCode.value,
              "drugName": this.drugName.value,
              "drugForm": this.drugForm.value,
              "drugStrength": this.drugStrength.value,
              "action":"save"
            }
          //  this.diagnosisForm.reset();
          console.log(newMedication);
            this.dialogRef.close(newMedication);
          }
          
        },
      error: () => {
        this.toasterService.error("Something went wrong")
      }
    })
  }
}

}


