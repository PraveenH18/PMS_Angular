import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from 'src/app/common/message/message.component';
import { HospitaluserService } from '../../hospitaluser/services/hospitaluser.service';

@Component({
  selector: 'app-vitalsigns',
  templateUrl: './vitalsigns.component.html',
  styleUrls: ['./vitalsigns.component.css']
})
export class VitalsignComponent implements OnInit {

  @Input()
  appointment: any = "";

  @Output()
  onVitalSubmit:EventEmitter<boolean>=new EventEmitter();

  status:string="";
  isSubmitted:boolean=false;
  visitId:String="";
  height=new FormControl("",[Validators.required,Validators.pattern("^[0-9]{1,3}$"),Validators.max(250)]);
  weight=new FormControl("",[Validators.required,Validators.pattern("^\\d*(\\.\\d{1})?$")]);
  bp=new FormControl("",[Validators.required,Validators.pattern("^[0-9]{1,3}/[0-9]{1,3}$")]);
  temp=new FormControl("",[Validators.required,Validators.pattern("^\\d*(\\.\\d{1})?$")]);
  respRate=new FormControl("",Validators.required);
  
  vitalForm=new FormGroup(
    {
      height:this.height,
      weight:this.weight,
      bp:this.bp,
      temp:this.temp,
      respRate:this.respRate,
    }
  );

  constructor(private dialogRef:MatDialog,private dbService:HospitaluserService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    //this.visitId=this.route.snapshot.params["visit_id"];
    this.visitId=this.appointment.appointmentId;
    this.status=this.appointment.status.toLowerCase();
    this.dbService.getVitalSign(this.visitId).subscribe((vitalSignDto)=>{
      if(vitalSignDto!=null){
        this.height.setValue(vitalSignDto.height);
        this.weight.setValue(vitalSignDto.weight);
        this.bp.setValue(vitalSignDto.bloodPressure);
        this.temp.setValue(vitalSignDto.temperature);
        this.respRate.setValue(vitalSignDto.respirationRate);
        this.isSubmitted=true;
        this.onVitalSubmit.emit(true);
        this.vitalForm.disable();
      }   
     },
     (error)=>{
      if(error.status==204){
        this.isSubmitted=false;
        this.vitalForm.enable();
      }
            
     });
  }

  submit_click(){
    this.vitalForm.markAllAsTouched();
    if(this.vitalForm.valid){ 
     const vitalDetail={
       "visitId":this.visitId,
       "height":this.height.value,
       "weight":this.weight.value,
       "bloodPressure":this.bp.value,
       "temperature":this.temp.value,
       "respirationRate":this.respRate.value
      }
      this.dbService.saveVitalSigns(vitalDetail).subscribe(
        (response)=>{
          this.openMessageDialog(response.message);
          this.isSubmitted=true;
          this.onVitalSubmit.emit(true);
          this.vitalForm.disable();
          for (let control in this.vitalForm.controls) {
            this.vitalForm.controls[control].disable();
          }
        }
      )  
    }
  }

  edit_click(){
    this.isSubmitted=false;
    this.vitalForm.enable();
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

}