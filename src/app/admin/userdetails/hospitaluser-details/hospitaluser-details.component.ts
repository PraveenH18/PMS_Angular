import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-hospitaluser-details',
  templateUrl: './hospitaluser-details.component.html',
  styleUrls: ['./hospitaluser-details.component.css']
})
export class HospitaluserDetailsComponent implements OnInit {

  constructor(private adminServ: AdminService, private route: ActivatedRoute, private router: Router, private matDialog: MatDialog) { }
  displayedColumns: string[] = ['id'];
  dataSource !: MatTableDataSource<any>;

  userList: any = "";
  userId: any = "";

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
      console.log(this.userId)

    this.adminServ.getEmplById(this.userId).subscribe((response: any) => {
      this.userList = response;

      this.dataSource = new MatTableDataSource(this.userList);
      console.log(this.userList)

    });
  }

  backTo() {
    this.router.navigate(['/admin/hospitalAccountManagement']);
  }

}

