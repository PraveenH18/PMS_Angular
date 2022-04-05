import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Allergy } from '../../../patient/model/Allergy';
import { UpdateDemographicDetails } from '../../../patient/model/updateDemographicDetails';
import { PatientService } from '../../../patient/services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  public patientId:number=0;
  
  constructor(private dialog: MatDialog,private patientDbService: PatientService, private toastr:ToastrService,private route: ActivatedRoute) { 
    this.patientId = this.route.snapshot.params["patientId"];
  }
  public isSelected: boolean = false;
  public message: string = "";
  public isHidden:boolean = true;
  public isEditDisabled:boolean = false;
  public displaySaveBtn:boolean = false;
  public patientAllergyDetails:Allergy[] = [];
  public isAllergyTypeOthers:boolean = false; 
  public isDisabled:boolean = true;
  public open:boolean= false;
  public isPatientSelectedAllergiesEmpty:boolean=false;
  public showAddAllergy:boolean = false;
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

  title: FormControl = new FormControl("", [Validators.required]);
  firstName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  dob: FormControl = new FormControl('', [Validators.required]);
  age: FormControl = new FormControl('', [Validators.required]);
  gender: FormControl = new FormControl('', [Validators.required]);
  race: FormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  ethnicity: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  languagesKnown: FormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  homeAddress: FormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  countryCode: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  contactNumber: FormControl = new FormControl('', [Validators.required, Validators.pattern("\\d{10}")]);
  eTitle: FormControl = new FormControl('', Validators.required);
  eFirstName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  eLastName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  eRelationship: FormControl = new FormControl('', [Validators.required]);
  eContact: FormControl = new FormControl('', [Validators.required, Validators.pattern("\\d{10}")]);
  eAddress: FormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  isPatientPortalAccessibleToE: FormControl = new FormControl('No', [Validators.required]);
  isSameAsPatientAddress: FormControl = new FormControl('');

  public patientDetailsForm: FormGroup = new FormGroup({
    title: this.title,
    firstName: this.firstName,
    lastName: this.lastName,
    dob: this.dob,
    age: this.age,
    gender: this.gender,
    race: this.race,
    ethnicity: this.ethnicity,
    languagesKnown: this.languagesKnown,
    email: this.email,
    homeAddress: this.homeAddress,
    countryCode: this.countryCode,
    contactNumber: this.contactNumber,
    eTitle: this.eTitle,
    eFirstName: this.eFirstName,
    eLastName: this.eLastName,
    eRelationship: this.eRelationship,
    eContact: this.eContact,
    eAddress: this.eAddress,
    isSameAsPatientAddress: this.isSameAsPatientAddress,
    isPatientPortalAccessibleToE: this.isPatientPortalAccessibleToE,

  });

 
  ngOnInit(): void {
    this.patientDetailsForm.disable();
    this.getPatientById(this.patientId);
    }


  public addressFiller(): void {
    this.isSelected = !this.isSelected;
    if(this.isSelected === true){
    let eAddress = this.patientDetailsForm.controls['homeAddress'].value
    this.patientDetailsForm.controls['eAddress'].setValue(eAddress);
    } else {
      this.patientDetailsForm.controls['eAddress'].setValue('');
    }

  }


  public editForm():void{
    this.patientDetailsForm.controls['firstName'].enable();
    this.patientDetailsForm.controls['lastName'].enable();
    this.patientDetailsForm.controls['languagesKnown'].enable();
    this.patientDetailsForm.controls['ethnicity'].enable();
    this.patientDetailsForm.controls['homeAddress'].enable();
    this.patientDetailsForm.controls['countryCode'].enable();
    this.patientDetailsForm.controls['contactNumber'].enable();
    this.patientDetailsForm.controls['eTitle'].enable();
    this.patientDetailsForm.controls['eFirstName'].enable();
    this.patientDetailsForm.controls['eLastName'].enable();
    this.patientDetailsForm.controls['eRelationship'].enable();
    this.patientDetailsForm.controls['eContact'].enable();
    this.patientDetailsForm.controls['eAddress'].enable();
    this.patientDetailsForm.controls['isPatientPortalAccessibleToE'].enable();
    this.displaySaveBtn = true;
    this.isEditDisabled = true;
    this.isHidden = false; 
  }

  
  public updatePatientDetails(): void {
    if (this.patientDetailsForm.invalid) {
      this.toastr.error("One or more missing field");
    } else {
       let updatedDetails:UpdateDemographicDetails = new UpdateDemographicDetails();
        updatedDetails.firstName=this.patientDetailsForm.controls['firstName'].value;
        updatedDetails.lastName=this.patientDetailsForm.controls['lastName'].value;
        updatedDetails.age=this.patientDetailsForm.controls['age'].value;
        updatedDetails.ethnicity=this.patientDetailsForm.controls['ethnicity'].value;
        updatedDetails.languagesKnown=this.patientDetailsForm.controls['languagesKnown'].value;
        updatedDetails.address=this.patientDetailsForm.controls['homeAddress'].value;
        updatedDetails.countryCode=this.patientDetailsForm.controls['countryCode'].value;
        updatedDetails.contactNo=this.patientDetailsForm.controls['contactNumber'].value;
        updatedDetails.emergencyTitle=this.patientDetailsForm.controls['eTitle'].value;
        updatedDetails.emergencyFirstName=this.patientDetailsForm.controls['eFirstName'].value;
        updatedDetails.emergencyLastName=this.patientDetailsForm.controls['eLastName'].value;
        updatedDetails.relationship=this.patientDetailsForm.controls['eRelationship'].value;
        updatedDetails.emergencyContact=this.patientDetailsForm.controls['eContact'].value;
        updatedDetails.emergencyAddress=this.patientDetailsForm.controls['eAddress'].value;
        updatedDetails.hasAccess=this.patientDetailsForm.controls['isPatientPortalAccessibleToE'].value;
       // updatedDetails.patientAllergies = this.patientSelectedAllergies;
        if(this.patientSelectedAllergies.length!==0){
          this.patientSelectedAllergies.forEach(e=>updatedDetails.patientAllergies.push(e));
        }
        this.patientSelectedAllergies.splice(0,this.patientSelectedAllergies.length);

      this.patientDbService.updateDemographicDetails(updatedDetails,this.patientId).subscribe(response=>{
        this.getPatientById(this.patientId);  
        this.toastr.success("Details updated successfully");
      },(error:any)=>{
          this.toastr.error("OOPS!Something went wrong.");
      });
      
      this.patientDetailsForm.disable();
      this.isHidden = true;
      this.isEditDisabled = false;
      this.displaySaveBtn = false;
    }
  }
 
 public deleteAllergy(allergyId:string):void{
  let index:number = this.patientAllergyDetails.findIndex(element=>element.allergyId==allergyId);
  this.patientAllergyDetails.splice(index,1);
  this.patientDbService.deleteAllergy(allergyId,this.patientId).subscribe((response:any)=>{
    this.toastr.success(response.message);
  },(error:any)=>{
    this.toastr.error("Something went wrong");
  });
 }

  public getPatientById(id:number): void {

    this.patientDbService.getPatientDemographicById(this.patientId).subscribe((response: any) => {
      if (response !== undefined) {
        this.patientDetailsForm.controls['title'].setValue(response.title);
        this.patientDetailsForm.controls['firstName'].setValue(response.firstName);
        this.patientDetailsForm.controls['lastName'].setValue(response.lastName);
        this.patientDetailsForm.controls['dob'].setValue(response.dateOfBirth);
        this.patientDetailsForm.controls['age'].setValue(response.age);
        this.patientDetailsForm.controls['gender'].setValue(response.gender);
        this.patientDetailsForm.controls['race'].setValue(response.race);
        this.patientDetailsForm.controls['ethnicity'].setValue(response.ethnicity);
        this.patientDetailsForm.controls['languagesKnown'].setValue(response.languagesKnown);
        this.patientDetailsForm.controls['email'].setValue(response.emailId);
        this.patientDetailsForm.controls['homeAddress'].setValue(response.address);
        this.patientDetailsForm.controls['countryCode'].setValue(response.countryCode);
        this.patientDetailsForm.controls['contactNumber'].setValue(response.contactNo)
        this.patientDetailsForm.controls['eTitle'].setValue(response.etitle);
        this.patientDetailsForm.controls['eFirstName'].setValue(response.emergencyFirstName);
        this.patientDetailsForm.controls['eLastName'].setValue(response.emergencyLastName);
        this.patientDetailsForm.controls['eRelationship'].setValue(response.relationship);
        this.patientDetailsForm.controls['eContact'].setValue(response.emergencyContactNo);
        this.patientDetailsForm.controls['eAddress'].setValue(response.emergencyAddress);
        if(response.hasAccess === true){
          this.patientDetailsForm.controls['isPatientPortalAccessibleToE'].setValue("true");
        }else {
        this.patientDetailsForm.controls['isPatientPortalAccessibleToE'].setValue("false");
        }
        this.patientAllergyDetails = response.patientAllergies;
      }
    
    }, (error: any) => {
      if (error.status = 404) {
        this.message = error.error;
      }
    });
  }
/*******************************Add new allergy***********************************/
public getAllergyById(): void {
    

  let allergyId: string = this.patientAllergyForm.controls['allergyId'].value;
  
  this.patientDbService.getAllergyById(allergyId).subscribe((response: Allergy) => {
    if (response !== undefined) {
  
      this.patientAllergyForm.controls['allergyType'].setValue(response.allergyType);
      this.patientAllergyForm.controls['allergyName'].setValue(response.allergyName);
      this.uniqueAllergyNames.push(response.allergyName);
      this.patientAllergyForm.controls['allergyDescription'].setValue(response.allergySource);
      this.uniqueAllergySource.push(response.allergySource);
      this.patientAllergyForm.controls['allergyClinicalInfo'].setValue(response.allerginicity);
      this.uniqueAllergyClinicInfo.push(response.allerginicity);

    }

  }, (error: any) => {
    if (error.status = 404) {
      this.message = error.error;
    }
  });
  this.uniqueAllergyNames.splice(0, this.uniqueAllergyNames.length);
  this.uniqueAllergySource.splice(0, this.uniqueAllergySource.length);
  this.uniqueAllergyClinicInfo.splice(0, this.uniqueAllergyClinicInfo.length);

}

public checkAllergyType(): void {
  this.uniqueAllergyNames.splice(0, this.uniqueAllergyNames.length);
  this.uniqueAllergyIds.splice(0, this.uniqueAllergyIds.length);

  let allergyType: string = this.patientAllergyForm.controls['allergyType'].value;
  this.patientDbService.getAllergyNames(allergyType).subscribe((response: string[]) => {
   response.forEach(e=> this.uniqueAllergyNames.push(e));
    
  }, (error: any) => {
    if (error.status = 404) {
      this.message = error.error;
    }
  });
}

public getAllergyBySource(): void {
  this.uniqueAllergyIds.splice(0, this.uniqueAllergyIds.length);


  let allergyName: string = this.patientAllergyForm.controls['allergyName'].value;
  this.patientDbService.getAllergySources(allergyName).subscribe((response: string[]) => {
    response.forEach(e=> this.uniqueAllergySource.push(e));
    
  }, (error: any) => {
    if (error.status = 404) {
      this.message = error.error;
    }
  });
  this.uniqueAllergySource.splice(0, this.uniqueAllergySource.length);
 // this.allergySource.splice(0, this.allergySource.length);

}


public getClinicalInformationBySource(): void {
  this.uniqueAllergyIds.splice(0, this.uniqueAllergyIds.length);
  
      let allergySource: string = this.patientAllergyForm.controls['allergyDescription'].value;
      this.patientDbService.getAllergyClinicalInfo(allergySource).subscribe((response: string[]) => {
        response.forEach(e=> this.uniqueAllergyClinicInfo.push(e));
   
      }, (error: any) => {
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
       
      this.patientDbService.getAllergyIds(allergyType,allergyName,allergySource,allerginicity).subscribe((response: string[])=>{
        response.forEach(e=>this.uniqueAllergyIds.push(e));
        if(this.uniqueAllergyIds.length>0){
          this.showAllergyIdInput=false;
          this.showSelect=true;
        }
        
      },(error: any) => {
        if (error.status = 404) {
          this.message = error.error;
        }
      });     
      
    }

    public savePatientAllergyForm():void{
  
      if(this.patientAllergyForm.controls["allergyId"].value==""){
        this.toastr.error("Allergy ID is required");
      } else {
      let allergy:Allergy = new Allergy();
      allergy.allergyId = this.patientAllergyForm.controls['allergyId'].value;
      allergy.allergyType = this.patientAllergyForm.controls['allergyType'].value;
      allergy.allergySource = this.patientAllergyForm.controls['allergyDescription'].value;
      allergy.allergyName = this.patientAllergyForm.controls['allergyName'].value;
      allergy.allerginicity = this.patientAllergyForm.controls['allergyClinicalInfo'].value;
      allergy.isAllergyFatal = this.patientAllergyForm.controls['isAllergyFatal'].value;
      
     let checkAllergy1:Allergy[]=this.patientSelectedAllergies.filter(e=>e.allergyId === allergy.allergyId);
     let checkAllergy2:Allergy[]=this.patientAllergyDetails.filter(e=>e.allergyId === allergy.allergyId); 
     if(checkAllergy1.length===0 && checkAllergy2.length === 0){
      this.patientSelectedAllergies.push(allergy);
      this. updatePatientDetails();
      this.showAddAllergy = false;   
      this.patientSelectedAllergies = [];
      } else{
        this.toastr.error("Allergy is already added");
      }
     
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
        newAllergy.allergyType = this.newAllergyForm.controls['newAllergyType'].value;
        newAllergy.allergyName = this.newAllergyForm.controls['newAllergyName'].value;
        newAllergy.allergySource = this.newAllergyForm.controls['newAllergySource'].value;
        newAllergy.isoformsOrPartialSequenceOfAllergen = this.newAllergyForm.controls['isoformsOrPartialSequenceOfAllergen'].value;
        newAllergy.allerginicity = this.newAllergyForm.controls['allerginicity'].value;
        newAllergy.isAllergyFatal = this.newAllergyForm.controls['isNewAllergyFatal'].value; 
      

      let checkAllergy1:Allergy[]=this.patientSelectedAllergies.filter(e=>e.allergyId === newAllergy.allergyId);
      let checkAllergy2:Allergy[]=this.patientAllergyDetails.filter(e=>e.allergyId === newAllergy.allergyId); 
      if(checkAllergy1.length===0 && checkAllergy2.length === 0){
      this.patientSelectedAllergies.push(newAllergy);
      this. updatePatientDetails();
       } else{
         this.toastr.error("Allergy is already added");
       }
        this.newAllergyForm.reset();
        this.newAllergyForm.controls['isNewAllergyFatal'].setValue('No');
        this.isPatientSelectedAllergiesEmpty=true;
        this.isAllergyTypeOthers = false;
        
      }
    }

 public addAllergyBtn():void{
      this.showAddAllergy = !this.showAddAllergy;     
    
  }

  public addAllergy():void{
    let allergyType:string= this.patientAllergyForm.controls['allergyType'].value;
    if(allergyType === 'Others'){
      this.isAllergyTypeOthers=true ;
    } else{
      this.isAllergyTypeOthers=false;
    }
  }
}