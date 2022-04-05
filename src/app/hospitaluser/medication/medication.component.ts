import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageComponent } from 'src/app/common/message/message.component';
import { Medication } from 'src/app/hospitaluser/model/Medication';
import { HospitaluserService } from '../services/hospitaluser.service';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {

  @Input()
  appointment: any = "";

  visitStatus:string="";
  visitId:String="";
  isSubmitted:boolean=false;
  invalidCode:boolean=false;
  showNewMedicationText: boolean = false;
  medicationData: Medication[] = [];
  drugNameArr: string[] = [];
  drugCodeArr: string[] = [];
  
  otherDrugControl = new FormControl();
   filteredNames: string[]=[];
   filteredCodes: string[]=[];
   drugStrength:string[]=[];
   drugForms:string[]=[];
  
  drugIdControl = new FormControl('',Validators.required);
  drugNameControl = new FormControl('',Validators.required);
  drugFormFC = new FormControl('',Validators.required);
  drugFormStrengthFC = new FormControl('',Validators.required);

  newDrugNameControl = new FormControl();
  newDrugFormControl = new FormControl();
  newDrugStrengthControl = new FormControl();

   medicationForm: FormGroup = new FormGroup({
    drugID: this.drugIdControl,
    drugName: this.drugNameControl,
    drugFormFC: this.drugFormFC,
    drugFormStrengthFC: this.drugFormStrengthFC
  }
  );
  newMedicationForm=new FormGroup({
    newDrugNameControl:this.newDrugNameControl,
    newDrugFormControl:this.newDrugFormControl,
    newDrugStrengthControl:this.newDrugStrengthControl,
  });
  selectedMedication: Medication[] = [];


  constructor(private router:Router,
    private dbService:HospitaluserService,private toastr:ToastrService) { }


  ngOnInit() {
    //this.medicationData = this.route.snapshot.data['medicationData'];
    const madicationListString: string | null = localStorage.getItem("medicationData");
    if (madicationListString)
      this.medicationData = JSON.parse(madicationListString);
      this.medicationData.push(new Medication("Not Defined","Other","Other Medication","Other"));
    this.visitId = this.appointment.appointmentId;
    this.visitStatus = this.appointment.status.toLowerCase();
    // this.visitId=this.route.snapshot.params["visit_id"];
    this.dbService.getMedications(this.visitId).subscribe(medicationDto => {
      this.selectedMedication = medicationDto.medications;
      if (this.selectedMedication.length != 0) {
        this.isSubmitted = true;
      }else{
        if(this.visitStatus=='closed'){
          this.isSubmitted=true;
        }
      }
    });
    this.drugNameArr = this.medicationData.map(data => data.drugName).
      filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    this.drugCodeArr = this.medicationData.map(data => data.drugCode).
      filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    this.filteredNames = this.drugNameArr;
    this.filteredCodes = this.drugCodeArr;
    this.drugFormFC.disable();
    this.drugFormStrengthFC.disable();
  }

  onDrugIdSelect(event:any) {
    let selecteddrugId = event.itemData.value;
    const medication: Medication | undefined = this.medicationData.find(data => data.drugCode == selecteddrugId);
    if (medication !== undefined) {
      this.drugFormFC.disable();
      this.drugFormStrengthFC.disable();
      this.drugFormFC.setValue(medication.drugForm);
      this.drugFormStrengthFC.setValue(medication.drugStrength);
      this.drugNameControl.setValue(medication.drugName);
    }
  }

  onDrugNameSelect(event: any) {
    let selectedDrugName=event.itemData.value;
    this.drugNameControl.setValue(selectedDrugName);
     this.drugForms=[];
    if (selectedDrugName.toLowerCase() == 'other') {
      this.addValidators(this.newMedicationForm);
      this.showNewMedicationText=true;
      this.drugIdControl.setValue("Not Defined");
      this.drugFormFC.setValue('');
      this.drugFormStrengthFC.setValue('');
      this.newMedicationForm.enable();
    } else {
      this.addValidators(this.medicationForm);
      this.newMedicationForm.disable();
      this.drugFormFC.enable();
      let medication: Medication[] = this.medicationData.
      filter(data => data.drugName == selectedDrugName);
      for (let i = 0; i < medication.length; i++) {
          this.drugForms.push(medication[i].drugForm);
        }
      
        this.drugForms=this.drugForms.filter((value,index,self)=>{
          return self.indexOf(value)===index;
        });

        if(this.drugForms.length==1){
          this.drugFormFC.setValue(medication[0].drugForm);
         this.drugFormFC.disable();
         this.getCorrespondingDrugStrength();
        }
    }
  }

  getCorrespondingDrugStrength(){
    this.drugStrength=[];
    this.drugFormStrengthFC.enable();
    let medication: Medication[] = this.medicationData.
      filter(data => data.drugName == this.drugNameControl.value && data.drugForm==this.drugFormFC.value);
      for (let i = 0; i < medication.length; i++) {
         this.drugStrength.push(medication[i].drugStrength);
        }
        this.drugStrength=this.drugStrength.filter((value,index,self)=>{
          return self.indexOf(value)===index;
        });

        if(this.drugStrength.length==1){
          this.drugFormStrengthFC.setValue(medication[0].drugStrength);
          this.drugFormStrengthFC.disable();
        }
  }


  delete_click(drugId:string){
    let index = this.selectedMedication.findIndex(p => p.drugCode == drugId);
    this.selectedMedication.splice(index, 1);
  }

  add_click() {
    if (this.drugNameControl.value.toLowerCase() == "other") {
      this.newMedicationForm.markAllAsTouched();
      const medication = new Medication("ND",
        this.newDrugFormControl.value, this.newDrugNameControl.value, this.newDrugStrengthControl.value);
     
      if (this.newMedicationForm.valid) {
        this.selectedMedication.push(medication);
        this.medicationForm.enable();
        this.newMedicationForm.disable();
        this.showNewMedicationText = false;
      }
    } else {
      this.medicationForm.markAllAsTouched();
      let medicationFound = this.medicationData.find(data => {
        if (data.drugName === this.drugNameControl.value
          && data.drugForm === this.drugFormFC.value
          && data.drugStrength === this.drugFormStrengthFC.value
        ) {
          console.log("found");
          return true;
        }
        return false;
      }
      );
      if (medicationFound) {
        this.drugIdControl.setValue(medicationFound.drugCode);
        let medication = new Medication();
        let found = this.selectedMedication.findIndex(medication => medication.drugCode == this.drugIdControl.value);
        if (found == -1) {
          medication = new Medication(this.drugIdControl.value,
            this.drugFormFC.value, this.drugNameControl.value, this.drugFormStrengthFC.value);
        } else {
          this.toastr.error("Medication Already Added");
          return;
        }

        if (this.medicationForm.valid) {

          this.selectedMedication.push(medication);
          this.resetField();
        }
      } else {
        if (this.drugFormStrengthFC.enabled) {
          this.drugFormStrengthFC.setValue('');
        }
      }
      

    }
    
  }
  submit_click() {
    if(this.selectedMedication.length>0){
      const medicationDto = {
        "visitId": this.visitId,
        "medications": this.selectedMedication
      };
      this.dbService.saveMedicationDetails(medicationDto).subscribe(
        (response) => {
          this.toastr.success(response.message);
          this.isSubmitted = true;
        },
        (error) => {
          console.log(error);
          this.toastr.error("Error Occured While Saving Procedure Details");
        }
      );
    }else{
      this.toastr.error("Please add suitable Medication");
    }
   
  }
  edit_click(){
    this.isSubmitted=false;
  }

  addValidators(formgroup:FormGroup) {
    if(formgroup==this.newMedicationForm){
      for (let control in this.newMedicationForm.controls) {
        this.newMedicationForm.controls[control].addValidators(Validators.required);
      }
      for (let control in this.medicationForm.controls) {
        this.medicationForm.controls[control].removeValidators(Validators.required);
      }
    }
    if(formgroup==this.medicationForm){
      for (let control in this.newMedicationForm.controls) {
        this.newMedicationForm.controls[control].removeValidators(Validators.required);
      }
      for (let control in this.medicationForm.controls) {
        this.medicationForm.controls[control].addValidators(Validators.required);
      }
    }

  }

 
  onFilteringDrugNam(event: any){
    const value = event.text;
    if (value.length<3) {
      this.filteredNames = this.drugNameArr;
      event.updateData(this.filteredNames);
    } else {
      this.filteredNames = this.drugNameArr.filter(option => option.toLowerCase().includes(value));
      event.updateData(this.filteredNames);
    }
  }

  onFilteringDrugId(event: any){
    const value = event.text;
    if (value.length<3) {
      this.filteredCodes = this.drugCodeArr;
      event.updateData(this.filteredCodes);
    } else {
      this.filteredCodes = this.drugCodeArr.filter(option => option.toLowerCase().includes(value));
      event.updateData(this.filteredCodes);
    }
  }

  
  resetField(){
    this.drugForms = [];
    this.drugStrength = [];
    this.filteredNames=this.drugNameArr;
    this.filteredCodes=this.drugCodeArr;
    this.newDrugNameControl.setValue('');
    this.newDrugFormControl.setValue('');
    this.newDrugStrengthControl.setValue('');
    
  }

}
