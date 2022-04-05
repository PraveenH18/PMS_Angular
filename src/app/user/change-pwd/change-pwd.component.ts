import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit{

 
  oldPwd: FormControl = new FormControl("",[ Validators.required,
    Validators.minLength(8),Validators.maxLength(20)]);
  newPwd: FormControl = new FormControl("", [Validators.required,
    Validators.pattern("^(?=.*?[a-z])(?=.*?[A-Z])[a-zA-Z0-9]{8,20}$")]);
  conPwd: FormControl = new FormControl("", [Validators.required,
  confirmPasswordValidator(this.newPwd)]);

  message: String = "";
  showCancelButton:boolean=true;
  userRole: string | null = sessionStorage.getItem("role");

  public changePwdForm: FormGroup = new FormGroup({
    oldPwd: this.oldPwd, newPwd: this.newPwd, conPwd: this.conPwd
  });

  
  constructor(private router:Router,private toastr:ToastrService,
    private userService: UserService) {    
    }

  ngOnInit(){
    if(sessionStorage.getItem("status")=="default")
    this.showCancelButton=false;
  }

  submit_click() {
    this.changePwdForm.markAllAsTouched();
    if(this.changePwdForm.valid){
        const changePasswordDto={
          "oldPassword":this.oldPwd.value,
	        "newPassword":this.newPwd.value,
	        "emailId":"",
	        "userId":sessionStorage.getItem("user_id")
        }
        this.userService.resetPasswordRequest(changePasswordDto).subscribe(
          (response)=>{
            this.toastr.success(response.message);
            this.close_click();
          },
          (error)=>{
            this.message=error.error.message;
          }
        );
        
    }
  }

 
  close_click(){
    let role=sessionStorage.getItem("role");
    let path="";
    if(role=="physician" || role=="nurse"){
      path="/hospitaluser";
    }else{
      path="/"+role;
    }
    this.router.navigate([path]);
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