import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/admin/services/admin.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-patientuseraccountmanagement',
  templateUrl: './patientuseraccountmanagement.component.html',
  styleUrls: ['./patientuseraccountmanagement.component.css']
})
export class PatientuseraccountmanagementComponent implements OnInit {

  constructor(private adminServ: AdminService, private toastr: ToastrService) { }
  displayedColumns: string[] = ['userId', 'name', 'emailId', 'dateOfBirth', 'status', 'edit'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;

  userList: any[] = []

  statusList: any[] = ['BLOCKED', 'UNBLOCK', 'INACTIVE', 'ACTIVE'];

  getStatusList(status: string) {
    let fiterStatusList: any[] = [];
    fiterStatusList = this.statusList.filter(data => data != status);
    return fiterStatusList;
  }

  status: string = 'DEFAULT';
  ngOnInit(): void {
    this.adminServ.getPatient().subscribe((response: any) => {
      response.map((element: any) => {
        let userObj = {
          "userId": element.user.userId,
          "name": element.title + ". " + element.firstName + " " + element.lastName,
          "emailId": element.user.emailId,
          "dateOfBirth": element.dateOfBirth,
          "userRole": element.user.userRole,
          "status": element.user.status
        };
        this.userList.push(userObj);
      });
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;

    });
  }

  blockChange(id: any, status: any, emailId: any) {

    console.log("inside blockChange")
    if (status == 'UNBLOCK') {
      status = 'DEFAULT';
    }
    const statusDto = { "id": id, "status": status, "emailId": emailId }
    console.log(statusDto)
    this.adminServ.changeStatus(statusDto).subscribe((res: any) => {
      let userId = id;
      console.log(statusDto)
      this.userList.filter((data) => data.userId == userId).map((data) => {
        console.log(data.status)
        data.status = status;
        this.toastr.success('', 'Account Id ' + data.userId + ' status changed to ' + status, {
          timeOut: 3000
        });
      }
      );
      console.log(this.userList);
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      console.log(res);
    }
    )
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

