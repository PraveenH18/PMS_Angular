import { Component, Output, EventEmitter, Input, OnChanges,  OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Allergy } from '../model/Allergy';
import { PatientDetails } from '../model/PatientDetails';
import { PatientRegistrationDetails } from '../model/patientRegDetails';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnChanges, OnInit {


  constructor(private patientDbService: PatientService,  private toastr:ToastrService) { }


  scrollToTop() {
    this.toastr.info("Scroll to top to add allergies.");
  }

  public isSelected: boolean = false;
  public message: string = "";
  public hasAllergy: boolean = false;
  public genderSelected: string = '';
  public titleSelected: string = '';
  private patientId:number= JSON.parse(sessionStorage.getItem('user_id') || '{}');



  @Input()
  public newAllergyToBeAdded: Allergy = new Allergy;

  @Input()
  public allergyNotToBeAdded:string = "";


  public newAllergyArray: Allergy[] = [];


  ngOnInit(): void {
    
    console.log(this.patientId);
    this.patientDbService.getPatientRegDetailsById(this.patientId).subscribe((response: PatientRegistrationDetails) => {
      if (response !== undefined) {

        this.patientDetailsForm.controls['title'].setValue(response.title);
        this.patientDetailsForm.controls['title'].disable();

        this.patientDetailsForm.controls['firstName'].setValue(response.firstName);
        this.patientDetailsForm.controls['firstName'].disable();

        this.patientDetailsForm.controls['lastName'].setValue(response.lastName);
        this.patientDetailsForm.controls['lastName'].disable();

        this.patientDetailsForm.controls['gender'].setValue(response.gender);
        this.patientDetailsForm.controls['gender'].disable();

        this.patientDetailsForm.controls['dob'].setValue(response.dateOfBirth);
        this.patientDetailsForm.controls['dob'].disable();

        this.patientDetailsForm.controls['age'].setValue(response.age);
        this.patientDetailsForm.controls['age'].disable();

        this.patientDetailsForm.controls['email'].setValue(response.email);
        this.patientDetailsForm.controls['email'].disable();

        this.patientDetailsForm.controls['contactNumber'].setValue(response.contactNumber);
        this.patientDetailsForm.controls['contactNumber'].disable();
        console.log("******************"+JSON.stringify(response));

        this.newAllergyArray.splice(0,this.newAllergyArray.length);

      }

    },
      (error: any) => {
        console.log(error);
        if (error.status = 404) {
          this.message = error.error;
        }
      });


  }

  ngOnChanges(): void {

    let allergy:Allergy[] = this.newAllergyArray.filter(e=>e.allergyId===this.newAllergyToBeAdded.allergyId);
    if(allergy.length === 0){
      this.newAllergyArray.push(this.newAllergyToBeAdded);
    }
   

    this.newAllergyArray.forEach((element,index)=>{
        if(element.allergyId === this.allergyNotToBeAdded){
          console.log("allergy to be deleted--->>"+element.allergyId);
            this.newAllergyArray.splice(index,1);
        }
    });
   
  }




  title: FormControl = new FormControl("");
  firstName: FormControl = new FormControl('');
  lastName: FormControl = new FormControl('');
  dob: FormControl = new FormControl('');
  age: FormControl = new FormControl('');
  gender: FormControl = new FormControl('');
  race: FormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  ethnicity: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  languagesKnown: FormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  email: FormControl = new FormControl('');
  homeAddress: FormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  countryCode: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  contactNumber: FormControl = new FormControl('');
  eTitle: FormControl = new FormControl('', Validators.required);
  eFirstName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  eLastName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  eRelationship: FormControl = new FormControl('', [Validators.required]);
  eContact: FormControl = new FormControl('', [Validators.required, Validators.pattern("\\d{10}")]);
  eAddress: FormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  isPatientPortalAccessibleToE: FormControl = new FormControl('false', [Validators.required]);
  patientHasAllergies: FormControl = new FormControl('false', Validators.required);




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
    isPatientPortalAccessibleToE: this.isPatientPortalAccessibleToE,
    patientHasAllergies: this.patientHasAllergies
  });


  @Output() public childEvent = new EventEmitter();


  public showAllergy(): void {

    if (this.patientHasAllergies.value === 'true') {

      this.childEvent.emit(false);

    } else {

      this.childEvent.emit(true);
    }

  }

  
  public addressFiller(): void {

    this.isSelected = !this.isSelected;
    if (this.isSelected === true) {
      let eAddress = this.patientDetailsForm.controls['homeAddress'].value
      this.patientDetailsForm.controls['eAddress'].setValue(eAddress);
    } else {
      this.patientDetailsForm.controls['eAddress'].setValue('');
    }

  }


  // public ageCalculator(): void {
  //   let dateStr: string = this.patientDetailsForm.controls['dob'].value;
  //   let dateOfBirth = new Date(dateStr);
  //   this.patientDetailsForm.controls['age'].setValue(moment().diff(dateOfBirth, 'years'));
  // }

  public topFunction(container: any): void {
    console.log("inside top function--------------->>>>");
    container.body.scrollTop = 0; // For Safari
    container.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  public saveForm(): void {
    if (this.patientDetailsForm.invalid) {
      this.toastr.error("One or more missing field");
    } else {
       let demographicDetails:PatientDetails = new PatientDetails();
       demographicDetails.address = this.patientDetailsForm.controls['homeAddress'].value;
       demographicDetails.countryCode = this.patientDetailsForm.controls['countryCode'].value;
       demographicDetails.emergencyAddress = this.patientDetailsForm.controls['eAddress'].value;
       demographicDetails.emergencyTitle = this.patientDetailsForm.controls['eTitle'].value;
       demographicDetails.emergencyFirstName = this.patientDetailsForm.controls['eFirstName'].value;
       demographicDetails.emergencyLastName = this.patientDetailsForm.controls['eLastName'].value;
       demographicDetails.emergencyContactNo = this.patientDetailsForm.controls['eContact'].value;
       demographicDetails.race = this.patientDetailsForm.controls['race'].value;
       demographicDetails.ethnicity = this.patientDetailsForm.controls['ethnicity'].value;
       demographicDetails.languagesKnown = this.patientDetailsForm.controls['languagesKnown'].value;
      demographicDetails.relationship = this.patientDetailsForm.controls['eRelationship'].value;
       if(this.newAllergyArray.length===0 || this.patientDetailsForm.controls['patientHasAllergies'].value==='false'){
         this.newAllergyArray.splice(0,this.newAllergyArray.length);
        demographicDetails.patientAllergies= <Allergy[]>[]
        
       }else{
        this.newAllergyArray.forEach(e=>demographicDetails.patientAllergies.push(e));
       }


       demographicDetails.hasAccess = this.patientDetailsForm.controls['isPatientPortalAccessibleToE'].value;
        let demographicDetailsString:string = JSON.stringify(demographicDetails);
        let demographicDetailsPost:JSON = JSON.parse(demographicDetailsString);
        console.log(demographicDetails);
       this.patientDbService.savePatientDemographicDetails(this.patientId,demographicDetailsPost).subscribe((response: PatientDetails) => {
        if (response !== undefined) {
          
        }
        this.toastr.success("Saved successfully!")
  
      },
        (error: any) => {
          console.log(error);
          if (error.status = 404) {
            this.message = error.error;
          }
          this.toastr.error("Something went wrong!")
        });

     console.log("submitted---->"+JSON.stringify(demographicDetails));
      this.patientDetailsForm.disable();
      
    
      }
    
    }
  }





// function dateValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const today = new Date().getTime();

//     if (!(control && control.value)) {

//       return null;
//     }

//     return control.value.getTime() > today
//       ? { invalidDate: 'You cannot use future dates' }
//       : null;
//   }
// }