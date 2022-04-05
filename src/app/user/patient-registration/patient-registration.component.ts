import { Component} from '@angular/core';
import { AbstractControl,FormControl,FormGroup,ValidatorFn,Validators} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WaitDailogComponent } from 'src/app/shared/wait-dailog/wait-dailog.component';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent{

    title: FormControl = new FormControl("",[ Validators.required]);
    firstName: FormControl = new FormControl("",[ Validators.required, Validators.minLength(2)]);
    lastName: FormControl = new FormControl("",[ Validators.required, Validators.minLength(2)]);
    gender: FormControl = new FormControl("",[ Validators.required]);
    dob: FormControl = new FormControl("",[ Validators.required]);
    email: FormControl = new FormControl("",[ Validators.required, Validators.email]);
    contact: FormControl = new FormControl("",[ Validators.required, Validators.pattern("\\d{10}")]);
    password: FormControl = new FormControl("", [Validators.required, Validators.pattern("^(?=.*?[a-z])(?=.*?[A-Z])[a-zA-Z0-9]{8,20}$")]);
    confirmPassword: FormControl = new FormControl("", [Validators.required, confirmPasswordValidator(this.password)]);
    message: String = "";
    
      public registerForm: FormGroup = new FormGroup({
        title: this.title, firstName: this.firstName, lastName: this.lastName, gender: this.gender, 
        dob: this.dob, email: this.email, contact: this.contact, password: this.password, 
        confirmPassword: this.confirmPassword
      });
    
  constructor(private dialog:MatDialog,private router: Router,private dbService:UserService,private toastr: ToastrService) { }
  
  onSubmit() {
    console.log("in onsubmit");
    console.log(this.registerForm);
    this.registerForm.markAllAsTouched();
    console.log("touched");
    if(this.registerForm.valid){
        console.log("Clicked");
        const patientObj=
        {
          "title":this.title.value,
          "firstName":this.firstName.value,
          "lastName":this.lastName.value,
          "gender":this.gender.value,
          "dob":this.dob.value,
          "email":this.email.value,
          "contact":this.contact.value,
          "password":this.password.value,
          "roletype":"PATIENT"
        }


        console.log(patientObj);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose=true;
        dialogConfig.width='200px';
        const dialogRef = this.dialog.open(WaitDailogComponent,dialogConfig);
       
        this.dbService.registerPatient(patientObj).subscribe(res =>{
                this.toastr.success('Sign Up Successful')
                this.registerForm.reset();
                this.router.navigate(['/user/login']);
            },err=>{
                this.toastr.error('Something went wrong!!');
                dialogRef.close();
                
            },()=>{
              dialogRef.close();
            });
        }
    function confirmPasswordValidator(password: any): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
          if (control.value !== password.value){
            return { 'confirmPwd': true };
          }
          return null;
        };
      }
  }
  
  onReset() {
      this.registerForm.reset();
  }
}
function confirmPasswordValidator(password: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== password.value){
          return { 'confirmPwd': true };
        }
        return null;
      };
}

