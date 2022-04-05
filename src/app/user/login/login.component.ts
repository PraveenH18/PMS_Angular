import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPwdComponent } from '../forgot-pwd/forgot-pwd.component';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  email = new FormControl("", [Validators.required, Validators.email]);
  pwd = new FormControl("", Validators.required);
  message: string = "";
  public loginForm: FormGroup = new FormGroup({
    email: this.email, pwd: this.pwd
  });

  constructor(private dialog: MatDialog, private userService: UserService,
    private route: ActivatedRoute, private router: Router) {
  }

  openForgotPwd(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width='300px';
    const dialogRef = this.dialog.open(ForgotPwdComponent,dialogConfig);
  }

  login_click() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.userService
        .loginUser(this.email.value, this.pwd.value)
        .subscribe(
          (response: any) => {
           let path="";
            sessionStorage.setItem("AUTH_TOKEN", response.accessToken);
            sessionStorage.setItem("role", response.role.toLowerCase());
            sessionStorage.setItem("status", response.status.toLowerCase());
            sessionStorage.setItem("user_id", response.userId);
            console.log(sessionStorage.setItem("user_id", response.userId))
            const role = response.role.toLowerCase();
            if (role == "physician" || role == "nurse") {
              path = "/hospitaluser";
            } else {
              path = "/" + role;
            }
            if (response.status.toLowerCase() == "default") {
              location.replace("/user/changepassword");
            } else {
              location.replace(path);
            }
          },
          (error: any) => {
            if (error.status == 400 || error.status == 500) {
              this.message = error.error.message;
            } else {
              this.message = "Server Error";
            }
          }
        );
    }

  }


}
