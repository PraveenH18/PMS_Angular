import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  isLoggedIn:boolean=sessionStorage.getItem("AUTH_TOKEN")!=null;
  clickedTab:string="";
  role=sessionStorage.getItem("role");
  constructor(private toastr:ToastrService, private router: Router) {
  }

  ngOnInit(){
   
  }
  getDashboard(){
    let path="";
    if (this.role == "physician" || this.role == "nurse") {
      path = "/hospitaluser";
    } else {
      path = "/" + this.role;
    }

    this.router.navigate(['/'+path]);

  }
  logout_click(){
      sessionStorage.removeItem("AUTH_TOKEN")
      sessionStorage.clear();
      this.toastr.success("Logout Successfully");
      location.replace("/");
  }

  openState(tab:string){
    this.clickedTab=tab;
  }
}
