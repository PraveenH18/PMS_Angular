import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit,AfterViewInit {

  userName:string="Admin";
  adminImg:string="../../../assets/working.png";
  
  @ViewChild('drawer') 
  drawer!:MatDrawer ;
  constructor() { }
  showProfileOptions:boolean=false;
  showUserOptions:boolean=false;
  showMasterDataOptions:boolean=false;

  ngAfterViewInit(): void {
    this.drawer.toggle();
  }
  ngOnInit(): void {
  }


}
