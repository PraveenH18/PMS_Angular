import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from 'src/app/common/message/message.component';
import { Procedure } from 'src/app/hospitaluser/model/Procedure';
import { HospitaluserService } from '../../hospitaluser/services/hospitaluser.service';


@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedurePComponent implements OnInit {

  @Input()
  appointment: any = "";
  visitStatus:string="";

  visitId:string="";
  isSubmitted:boolean=false;
  showNewProcedureText: boolean = false;
  procedureData: Procedure[] = [];
  procCodeArr: string[] = [];
  procDescriptionArr: string[] = [];
  codeControl = new FormControl("", Validators.required);
  descControl = new FormControl("", Validators.required);
  otherDescControl = new FormControl();
   filteredCodes: string[] = [];
   filteredDescs: string[]=[];
   procedureForm: FormGroup = new FormGroup({
    code: this.codeControl,
    desc: this.descControl
  });
  newProcedureForm=new FormGroup({
    other: this.otherDescControl
  });

  selectedProcedure: Procedure[] = [];


  constructor(private route: ActivatedRoute,private dialogRef:MatDialog,
            private dbService:HospitaluserService) { }
  
  ngOnInit() {
    this.visitId=this.appointment.appointmentId;
    this.visitStatus=this.appointment.status.toLowerCase();
    this.dbService.getProcedures(this.visitId).subscribe(procedureDto=>{
      this.selectedProcedure=procedureDto.procedures;
      if(this.selectedProcedure.length!=0){
        this.isSubmitted=true;
      }else{
        if(this.visitStatus=='closed'){
          this.isSubmitted=true;
        }
      }
    });
    this.procedureData.push(new Procedure('Not Defined','Other Procedure',false));
    this.procCodeArr = this.procedureData.map(data => data.procedureCode);
    this.procDescriptionArr = this.procedureData.map(data => data.procedureDescription);
    this.filteredCodes=this.procCodeArr;
    this.filteredDescs=this.procDescriptionArr;
  }

  getProcedureDesc(event:any) {
    let selectedCode=event.itemData.value;
    let procedure: Procedure | undefined = this.procedureData.find(data => data.procedureCode === selectedCode);
    this.descControl.setValue(procedure?.procedureDescription);
  }

  getProcedureCode(event:any) {
    let selectedDesc=event.itemData.value;
    if (selectedDesc.toLowerCase() == 'other procedure') {
      this.addValidators(this.newProcedureForm);
      this.showNewProcedureText = true;
      this.codeControl.setValue("Not Defined");
    } else {
      this.addValidators(this.procedureForm);
      let procedure = this.procedureData.find(data => data.procedureDescription === selectedDesc);
      this.codeControl.setValue(procedure?.procedureCode);
    }
  }

  delete_clcik(code: string) {
    let index = this.selectedProcedure.findIndex(p => p.procedureCode == code);
    this.selectedProcedure.splice(index, 1);
  }
  add_click() {
    this.procedureForm.markAllAsTouched();
    this.newProcedureForm.markAllAsTouched();
    if (this.procedureForm.valid && this.newProcedureForm.valid) {
      let procedure: Procedure;
      if (this.codeControl.value == 'Not Defined') {
        procedure = new Procedure("ND", this.otherDescControl.value);
      } else {
        let found= this.selectedProcedure.findIndex(procedure=>procedure.procedureCode==this.codeControl.value);
        if(found==-1){
          procedure = new Procedure(this.codeControl.value, this.descControl.value);
        }else{
          alert("Procedure Already Added");
          return;
        }    
      }
      this.selectedProcedure.push(procedure);
      this.filteredCodes=this.procCodeArr;
      this.filteredDescs=this.procDescriptionArr;
      this.showNewProcedureText = false;
    }
  }

  resetField() {
    this.procedureForm.reset();
    for (let control in this.procedureForm.controls) {
      this.procedureForm.controls[control].setErrors(null);
    }

  }

  submit_click() {
    if (this.selectedProcedure.length > 0) {
      const procedureDto = {
        "visitId": this.visitId,
        "procedures": this.selectedProcedure
      };
      this.dbService.saveProcedureDetails(procedureDto).subscribe(
        (response) => {
          this.openMessageDialog(response.message);
          this.isSubmitted = true;
        },
        (error) => {
          console.log(error);
          alert("Error Occured While Saving Procedure Details");
        }
      );
    }else{
      alert("Please add suitable procedure");
    }
  }

  addValidators(formgroup:FormGroup) {
    if(formgroup==this.newProcedureForm){
      for (let control in this.newProcedureForm.controls) {
        this.newProcedureForm.controls[control].addValidators(Validators.required);
      }
      for (let control in this.procedureForm.controls) {
        this.procedureForm.controls[control].removeValidators(Validators.required);
      }
    }
    if(formgroup==this.procedureForm){
      for (let control in this.newProcedureForm.controls) {
        this.newProcedureForm.controls[control].removeValidators(Validators.required);
      }
      for (let control in this.procedureForm.controls) {
        this.procedureForm.controls[control].addValidators(Validators.required);
      }
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
  onFilteringCode(event: any) {
    const value = event.text;
    if (value ==="") {
      this.filteredCodes = this.procCodeArr;
      event.updateData(this.filteredCodes);
    } else {
      this.filteredCodes = this.procCodeArr.filter(option => option.toLowerCase().includes(value));
      event.updateData(this.filteredCodes);
    }
  }

  onFilteringDesc(event: any){
    const value = event.text;
    if (value.length<3) {
      this.filteredDescs = this.procDescriptionArr;
      event.updateData(this.filteredDescs);
    } else {
      this.filteredDescs = this.procDescriptionArr.filter(option => option.toLowerCase().includes(value));
      event.updateData(this.filteredDescs);
    }
  }


}
