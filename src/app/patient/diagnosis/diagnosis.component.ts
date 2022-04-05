import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from 'src/app/common/message/message.component';
import { Diagnosis } from 'src/app/hospitaluser/model/Diagnosis';
import { HospitaluserService } from '../../hospitaluser/services/hospitaluser.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisPComponent implements OnInit {

  @Input()
  appointment: any = "";

  visitStatus:string="";
  visitId: string = "";
  isSubmitted: boolean = false;
  isVisitClose:boolean=false;
  showNewDiagnosisText: boolean = false;
  diagnosisData: Diagnosis[] = [];
  diagnosisCodeArr: string[] = [];
  diagnosisDescriptionArr: string[] = [];
  codeControl = new FormControl("", Validators.required);
  descControl = new FormControl("", Validators.required);
  otherDescControl = new FormControl();
  filteredCodes: string[] = [];
  filteredDescs: string[] = [];

  diagnosisForm: FormGroup = new FormGroup({
    code: this.codeControl,
    desc: this.descControl
  });
  newDiagnosisForm=new FormGroup({
    other: this.otherDescControl
  });

  selectedDiagnosis: Diagnosis[] = [];
  
  constructor(private route: ActivatedRoute,private dialogRef:MatDialog,
    private dbService:HospitaluserService) {
  }

  ngOnInit(): void {
    //this.visitId = this.route.snapshot.params["visit_id"];
    this.visitId=this.appointment.appointmentId;
    this.visitStatus=this.appointment.status.toLowerCase();
    this.dbService.getDiagnosis(this.visitId).subscribe(diagnosisDto => {
      this.selectedDiagnosis = diagnosisDto.diagnoses;
      if (this.selectedDiagnosis.length != 0) {
        this.isSubmitted = true;
      }else{
        if(this.visitStatus=='closed'){
          this.isSubmitted=true;
        }
      }
      
    });
    this.diagnosisCodeArr = this.diagnosisData.map(data => data.diagnosisCode);
    this.diagnosisDescriptionArr = this.diagnosisData.map(data => data.diagnosisDescription);
    this.filteredCodes = this.diagnosisCodeArr;
    this.filteredDescs = this.diagnosisDescriptionArr;
  }

  getDiagnosisDesc(event:any) {
    let selectedCode=event.itemData.value;
    let diagnosis: Diagnosis | undefined = this.diagnosisData.find(data => data.diagnosisCode === selectedCode);
    this.descControl.setValue(diagnosis?.diagnosisDescription);
  }

  getDiagnosisCode(event:any) {
    let selectedDesc=event.itemData.value;
    if (selectedDesc.toLowerCase() == 'other diagnosis') {
      this.addValidators(this.newDiagnosisForm);
      this.showNewDiagnosisText = true;
      this.codeControl.setValue("Not Defined");
    } else {
      this.addValidators(this.diagnosisForm);
      let diagnosis = this.diagnosisData.find(data => data.diagnosisDescription === selectedDesc);
      if(diagnosis!=undefined){
        this.codeControl.setValue(diagnosis.diagnosisCode)
      }
        
    } 
  }

  delete_clcik(code: string) {
    let index = this.selectedDiagnosis.findIndex(d => d.diagnosisCode == code);
    this.selectedDiagnosis.splice(index, 1);
  }

  add_click() {
    this.diagnosisForm.markAllAsTouched();
    this.newDiagnosisForm.markAllAsTouched();
    if (this.diagnosisForm.valid && this.newDiagnosisForm.valid) {
      let diagnosis: Diagnosis;
      if (this.codeControl.value == 'Not Defined') {
        diagnosis = new Diagnosis("ND", this.otherDescControl.value);
      } else {
        let found= this.selectedDiagnosis.findIndex(diagnosis=>diagnosis.diagnosisCode==this.codeControl.value);
        if(found==-1){
          diagnosis = new Diagnosis(this.codeControl.value, this.descControl.value);
        }else{
          alert("Diagnosis Already Added");
          return;
        }    
      }
      this.selectedDiagnosis.push(diagnosis);
      this.filteredCodes=this.diagnosisCodeArr;
      this.filteredDescs=this.diagnosisDescriptionArr;
      this.showNewDiagnosisText = false;
    }
  }

  addValidators(formgroup:FormGroup) {
    if(formgroup==this.newDiagnosisForm){
      for (let control in this.newDiagnosisForm.controls) {
        this.newDiagnosisForm.controls[control].addValidators(Validators.required);
      }
      for (let control in this.diagnosisForm.controls) {
        this.diagnosisForm.controls[control].removeValidators(Validators.required);
      }
    }
    if(formgroup==this.diagnosisForm){
      for (let control in this.newDiagnosisForm.controls) {
        this.newDiagnosisForm.controls[control].removeValidators(Validators.required);
      }
      for (let control in this.diagnosisForm.controls) {
        this.diagnosisForm.controls[control].addValidators(Validators.required);
      }
    }

  }
  submit_click() {
    if(this.selectedDiagnosis.length>0){
      const diagnosisDto={
            "visitId":this.visitId,
	          "diagnoses":this.selectedDiagnosis
      };
      this.dbService.saveDiagnosisDetails(diagnosisDto).subscribe(
        (response)=>{
          this.openMessageDialog(response.message);
          this.isSubmitted=true;
        },
        (error)=>{
          console.log(error);
          alert("Error Occured While Saving Diagnosis Details");
        }
      );
     
    }else{
      alert("Please add suitable diagnosis");
    }
  }

  edit_click(){
    this.isSubmitted=false;
  }

  openMessageDialog(message:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.data={
      "message":message,
    };
    dialogConfig.width='300px';
    this.dialogRef.open(MessageComponent,dialogConfig);
    
  }
  
  resetField() {
    this.diagnosisForm.reset();
    for (let control in this.diagnosisForm.controls) {
      this.diagnosisForm.controls[control].setErrors(null);
    }

  }

  onFilteringCode(event: any) {
    const value = event.text;
    if (value ==="") {
      this.filteredCodes = this.diagnosisCodeArr;
      event.updateData(this.filteredCodes);
    } else {
      this.filteredCodes = this.diagnosisCodeArr.filter(option => option.toLowerCase().includes(value));
      event.updateData(this.filteredCodes);
    }
  }

  onFilteringDesc(event: any){
    const value = event.text;
    if (value.length<3) {
      this.filteredDescs = this.diagnosisDescriptionArr;
      event.updateData(this.filteredDescs);
    } else {
      this.filteredDescs = this.diagnosisDescriptionArr.filter(option => option.toLowerCase().includes(value));
      event.updateData(this.filteredDescs);
    }
  }
}

