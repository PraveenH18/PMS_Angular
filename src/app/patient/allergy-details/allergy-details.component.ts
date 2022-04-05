import { Component, EventEmitter,  Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Allergy } from '../model/Allergy';
import { PatientService } from '../services/patient.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-allergy-details',
  templateUrl: './allergy-details.component.html',
  styleUrls: ['./allergy-details.component.css']
})
export class AllergyDetailsComponent {

  displayedColumns: string[] = ['allergyId','allergyType', 'allergyName', 'isFatal','delete'];
  
  dataSource !: MatTableDataSource<any>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private patientDbService:PatientService, private toastr:ToastrService,
    private dialogRef:MatDialog) { }
 

   

  public message: string = "";
  public isAllergyTypeOthers:boolean = false; 
  public isDisabled:boolean = true;
  public open:boolean= false;
  public isPatientSelectedAllergiesEmpty:boolean=false;
  
 
 


  public patientSelectedAllergies:Allergy[]=[];
  public uniqueAllergyNames: string[] = [];
  public uniqueAllergySource: string[] = [];
  public uniqueAllergyClinicInfo:string[]=[];

  public uniqueAllergyIds:string[]=[];
  public showSelect:boolean = false;
  public showAllergyIdInput= true;

  allergyId: FormControl = new FormControl('',Validators.required);
  allergyType: FormControl = new FormControl('');
  allergyName: FormControl = new FormControl('');
  allergyDescription: FormControl = new FormControl('');
  allergyClinicalInfo: FormControl = new FormControl('');
  isAllergyFatal: FormControl = new FormControl('No');
  newAllergyId: FormControl = new FormControl('',Validators.required);
  newAllergyType: FormControl = new FormControl('', Validators.required);
  newAllergyName: FormControl = new FormControl('', Validators.required);
  newAllergySource: FormControl = new FormControl('', Validators.required);
  isoformsOrPartialSequenceOfAllergen: FormControl = new FormControl('', Validators.required);
  allerginicity: FormControl = new FormControl('', Validators.required);
  isNewAllergyFatal:FormControl = new FormControl('No',Validators.required);

  public patientAllergyForm: FormGroup = new FormGroup({
    allergyId: this.allergyId,
    allergyType: this.allergyType,
    allergyName: this.allergyName,
    allergyDescription: this.allergyDescription,
    allergyClinicalInfo: this.allergyClinicalInfo,
    isAllergyFatal:this.isAllergyFatal

  });

  public newAllergyForm: FormGroup = new FormGroup({
    newAllergyId: this.newAllergyId,
    newAllergyType: this.newAllergyType,
    newAllergyName: this.newAllergyName,
    newAllergySource:this.newAllergySource,
    isoformsOrPartialSequenceOfAllergen: this.isoformsOrPartialSequenceOfAllergen,
    allerginicity: this.allerginicity,
    isNewAllergyFatal:this.isNewAllergyFatal

  });



  @Output() public childEvent = new EventEmitter<Allergy>();
  @Output() public deleteAllergyChildEvent = new EventEmitter<string>();

  


  public getAllergyById(): void {
    

    let allergyId: string = this.patientAllergyForm.controls['allergyId'].value;
    
    this.patientDbService.getAllergyById(allergyId).subscribe((response: Allergy) => {
      console.log(JSON.stringify(response));
      if (response !== undefined) {
    
        this.patientAllergyForm.controls['allergyType'].setValue(response.allergyType);
        this.patientAllergyForm.controls['allergyName'].setValue(response.allergyName);
        this.uniqueAllergyNames.push(response.allergyName);
        this.patientAllergyForm.controls['allergyDescription'].setValue(response.allergySource);
        this.uniqueAllergySource.push(response.allergySource);
        this.patientAllergyForm.controls['allergyClinicalInfo'].setValue(response.allerginicity);
        this.uniqueAllergyClinicInfo.push(response.allerginicity);

      }

      console.log("----------------->>>>"+JSON.stringify( this.patientAllergyForm.value));
    }, (error: any) => {
      console.log(error);
      if (error.status = 404) {
        this.message = error.error;
      }
    });
    this.uniqueAllergyNames.splice(0, this.uniqueAllergyNames.length);
    this.uniqueAllergySource.splice(0, this.uniqueAllergySource.length);
    this.uniqueAllergyClinicInfo.splice(0, this.uniqueAllergyClinicInfo.length);

  }



  public checkAllergyType(): void {
    console.log("inside check allergy type");
    this.uniqueAllergyNames.splice(0, this.uniqueAllergyNames.length);
    this.uniqueAllergyIds.splice(0, this.uniqueAllergyIds.length);
 
    let allergyType: string = this.patientAllergyForm.controls['allergyType'].value;
    this.patientDbService.getAllergyNames(allergyType).subscribe((response: string[]) => {
     response.forEach(e=> this.uniqueAllergyNames.push(e));
      
    }, (error: any) => {
      console.log(error);
      if (error.status = 404) {
        this.message = error.error;
      }
    });
 //   this.uniqueAllergyNames.splice(0, this.uniqueAllergyNames.length);
    

  }

  public getAllergyBySource(): void {
    this.uniqueAllergyIds.splice(0, this.uniqueAllergyIds.length);
  
  
    let allergyName: string = this.patientAllergyForm.controls['allergyName'].value;
    this.patientDbService.getAllergySources(allergyName).subscribe((response: string[]) => {
      response.forEach(e=> this.uniqueAllergySource.push(e));
      
    }, (error: any) => {
      console.log(error);
      if (error.status = 404) {
        this.message = error.error;
      }
    });
    this.uniqueAllergySource.splice(0, this.uniqueAllergySource.length);
   // this.allergySource.splice(0, this.allergySource.length);

  }


  public getClinicalInformationBySource(): void {
  //  console.log("inside getClinicalInformationBySource");
  this.uniqueAllergyIds.splice(0, this.uniqueAllergyIds.length);
  
      let allergySource: string = this.patientAllergyForm.controls['allergyDescription'].value;
      this.patientDbService.getAllergyClinicalInfo(allergySource).subscribe((response: string[]) => {
        response.forEach(e=> this.uniqueAllergyClinicInfo.push(e));
   
      }, (error: any) => {
        console.log(error);
        if (error.status = 404) {
          this.message = error.error;
        }
      });
      this.uniqueAllergyClinicInfo.splice(0, this.uniqueAllergyClinicInfo.length);

  
    }

    public getAllergyIds():void{
      this.uniqueAllergyIds.splice(0, this.uniqueAllergyIds.length);
  
      let allergyType:string = this.patientAllergyForm.controls['allergyType'].value;
      let allergyName:string = this.patientAllergyForm.controls['allergyName'].value;
      let allergySource:string = this.patientAllergyForm.controls['allergyDescription'].value;
      let allerginicity:string = this.patientAllergyForm.controls['allergyClinicalInfo'].value;
      console.log("allergyType:-"+allergyType ); 
      console.log("allergyName:-"+allergyName ); 
      console.log("allergyDescription:-"+allergySource); 
      console.log("allergyClinicalInfo:-"+allerginicity); 
       
      this.patientDbService.getAllergyIds(allergyType,allergyName,allergySource,allerginicity).subscribe((response: string[])=>{
        response.forEach(e=>this.uniqueAllergyIds.push(e));
        if(this.uniqueAllergyIds.length>0){
          this.showAllergyIdInput=false;
          this.showSelect=true;
        }
        
      },(error: any) => {
        console.log(error);
        if (error.status = 404) {
          this.message = error.error;
        }
      });
       
      
    }

    public addAllergy():void{
      let allergyType:string= this.patientAllergyForm.controls['allergyType'].value;
      if(allergyType === 'Others'){
        this.isAllergyTypeOthers=true ;
      } else{
        this.isAllergyTypeOthers=false;
      }
  
    }

    public savePatientAllergyForm():void{
      if (this.patientAllergyForm.invalid) {
        this.toastr.error("One or more missing field");
      } else {
      let allergy:Allergy = new Allergy();
      allergy.allergyId = this.patientAllergyForm.controls['allergyId'].value;
      console.log("------------------>>>>>allergyid: "+allergy.allergyId)
      allergy.allergyType = this.patientAllergyForm.controls['allergyType'].value;
      allergy.allergySource = this.patientAllergyForm.controls['allergyDescription'].value;
      allergy.allergyName = this.patientAllergyForm.controls['allergyName'].value;
      allergy.allerginicity = this.patientAllergyForm.controls['allergyClinicalInfo'].value;
      allergy.isAllergyFatal = this.patientAllergyForm.controls['isAllergyFatal'].value;
      
      let checkAllergy:Allergy[]=this.patientSelectedAllergies.filter(e=>e.allergyId === allergy.allergyId);
       if(checkAllergy.length===0){
        this.childEvent.emit(allergy);
      this.patientSelectedAllergies.push(allergy);
      this.toastr.success("Allergy Added");
       } else{
         this.toastr.error("Allergy is already added");
       }
      this.dataSource = new MatTableDataSource(this.patientSelectedAllergies);
      this.dataSource.paginator = this.paginator;
      this.isPatientSelectedAllergiesEmpty=true;
      this.patientAllergyForm.reset();
      this.showAllergyIdInput=true;
      this.showSelect=false;
      this.uniqueAllergyIds.splice(0,this.uniqueAllergyIds.length);
      this.patientAllergyForm.controls['isAllergyFatal'].setValue('No');
  
      }
  
    }

    public saveNewAllergyForm():void {
      if (this.newAllergyForm.invalid) {
        this.toastr.error("One or more missing field");
      } else {
        let newAllergy:Allergy = new Allergy();
        newAllergy.allergyId = this.newAllergyForm.controls['newAllergyId'].value;
        console.log("------------------>>>>>newAllergyid: "+newAllergy.allergyId)
        newAllergy.allergyType = this.newAllergyForm.controls['newAllergyType'].value;
        newAllergy.allergyName = this.newAllergyForm.controls['newAllergyName'].value;
        newAllergy.allergySource = this.newAllergyForm.controls['newAllergySource'].value;
        newAllergy.isoformsOrPartialSequenceOfAllergen = this.newAllergyForm.controls['isoformsOrPartialSequenceOfAllergen'].value;
        newAllergy.allerginicity = this.newAllergyForm.controls['allerginicity'].value;
        newAllergy.isAllergyFatal = this.newAllergyForm.controls['isNewAllergyFatal'].value; 
      

        let checkAllergy:Allergy[]=this.patientSelectedAllergies.filter(e=>e.allergyId === newAllergy.allergyId);
        if(checkAllergy.length===0){
         this.childEvent.emit(newAllergy);
       this.patientSelectedAllergies.push(newAllergy);
       this.toastr.success("Allergy Added");
        } else{
          this.toastr.error("Allergy is already added");
        }
        this.dataSource = new MatTableDataSource(this.patientSelectedAllergies);
        this.dataSource.paginator = this.paginator;
        this.newAllergyForm.reset();
        this.newAllergyForm.controls['isNewAllergyFatal'].setValue('No');
        this.isPatientSelectedAllergiesEmpty=true;
        this.isAllergyTypeOthers = false;
        //this.dialogRef.closeAll();
      }
    }
  
    public deleteAllergy(allergy:Allergy):void{
      this.deleteAllergyChildEvent.emit(allergy.allergyId);
      this.patientSelectedAllergies.forEach((item,index)=>{
        if(item.allergyId===allergy.allergyId){
          this.patientSelectedAllergies.splice(index,1)
        }
      });
      
      this.dataSource = new MatTableDataSource(this.patientSelectedAllergies);
      this.dataSource.paginator = this.paginator;
        if(this.patientSelectedAllergies.length === 0){
            this.isPatientSelectedAllergiesEmpty=false;
        }
        
    }
 


}

