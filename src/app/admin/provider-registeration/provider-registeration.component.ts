import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminModel } from '../model/AdminModel';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WaitDailogComponent } from 'src/app/shared/wait-dailog/wait-dailog.component';




@Component({
  selector: 'app-provider-registeration',
  templateUrl: './provider-registeration.component.html',
  styleUrls: ['./provider-registeration.component.css']
})
export class ProviderRegisterationComponent implements OnInit {

  adminObj: AdminModel = new AdminModel();
  adminData: any;

  ngOnInit(): void {
  }


  constructor(private dialog: MatDialog, private formbuilder: FormBuilder,
    private adminServ: AdminService, private toastr: ToastrService) {
  }



  title: FormControl = new FormControl("", [Validators.required]);
  firstName: FormControl = new FormControl("", [Validators.required, Validators.minLength(2)]);
  lastName: FormControl = new FormControl("", [Validators.required, Validators.minLength(2)]);
  gender: FormControl = new FormControl("", [Validators.required]);
  emailId: FormControl = new FormControl("", [Validators.required, Validators.email]);
  contactNumber: FormControl = new FormControl("", [Validators.required, Validators.pattern("\\d{6,10}")]);
  dateOfBirth: FormControl = new FormControl("", [Validators.required]);
  role: FormControl = new FormControl("", [Validators.required]);
  specialization: FormControl = new FormControl("");
  status: boolean = true;

  spl: any[] = []

  public disableSpl(): void {
    console.log(this.prvRegForm.controls['role'].value)
    if (this.prvRegForm.controls['role'].value === 'physician') {
      this.spl = ['Dermatologist', 'Pediatrician',
        'OB/GYN (Obstetrician/Gynecologist)', 'Oncologist', 'Gastroenterologist'];
    } else {
      this.spl = [];
    }
  }

  public prvRegForm: FormGroup = new FormGroup({
    title: this.title, firstName: this.firstName, lastName: this.lastName, gender: this.gender, dateOfBirth: this.dateOfBirth,
    emailId: this.emailId, contactNumber: this.contactNumber, role: this.role, specialization: this.specialization,
  });

  postEmpl() {
    this.prvRegForm.markAllAsTouched();
    if (this.prvRegForm.valid) {

      this.adminObj.title = this.prvRegForm.value.title;
      this.adminObj.firstName = this.prvRegForm.value.firstName;
      this.adminObj.lastName = this.prvRegForm.value.lastName;
      this.adminObj.gender = this.prvRegForm.value.gender;
      this.adminObj.dateOfBirth = this.prvRegForm.value.dateOfBirth;
      this.adminObj.emailId = this.prvRegForm.value.emailId;
      this.adminObj.contactNumber = this.prvRegForm.value.contactNumber;
      this.adminObj.role = this.prvRegForm.value.role;
      this.adminObj.specialization = this.prvRegForm.value.specialization;
      this.adminObj.status = this.prvRegForm.value.status;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = '200px';
      const dialogRef = this.dialog.open(WaitDailogComponent, dialogConfig);
      this.adminServ.postEmpl(this.adminObj).subscribe(res => {
        console.log(res);
        this.toastr.success('', 'Registeration done successfully', {
          timeOut: 3000
        });
        // this.prvRegForm.reset();
      },
        err => {
          this.toastr.error('', 'Something went wrong', {
            timeOut: 3000,
          });
        }, () => {
          dialogRef.close();
        }
      )
    }
  }
}
