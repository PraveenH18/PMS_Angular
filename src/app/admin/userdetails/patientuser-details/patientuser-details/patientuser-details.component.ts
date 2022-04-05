import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-patientuser-details',
  templateUrl: './patientuser-details.component.html',
  styleUrls: ['./patientuser-details.component.css']
})
export class PatientuserDetailsComponent implements OnInit {

  constructor(private adminServ: AdminService, private route: ActivatedRoute,  private router: Router) { }
  displayedColumns: string[] = ['id'];
  dataSource !: MatTableDataSource<any>;

  userList: any = "";
  userId: any = "";

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    // this.userId = params.get('userId');

    console.log(this.userId)

    this.adminServ.getPatientById(this.userId).subscribe((response: any) => {
     this.userList= response;

      this.dataSource = new MatTableDataSource(this.userList);
      console.log(this.userList)

    });
  }

  backTo(){
    this.router.navigate(['/admin/patientAccountManagement']);
  }

}
