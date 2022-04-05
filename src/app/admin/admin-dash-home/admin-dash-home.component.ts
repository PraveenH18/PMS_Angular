import {  Component, ElementRef, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
// import * as Highcharts from 'highcharts';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dash-home',
  templateUrl: './admin-dash-home.component.html',
  styleUrls: ['./admin-dash-home.component.css']
})
export class AdminDashHomeComponent implements OnInit {

 
  constructor(private elementRef: ElementRef,private dbService:AdminService) { }
  chart: any;
  monthWiseData:number[]=[];
  patientCount=0;
  physicianCount=0;
  nurseCount=0;
  providerCount=0;
  userStat:number[]=[];

  ngOnInit(): void {
    this.dbService.getVisitStatictics().subscribe(response=>
      {
        this.monthWiseData=response;
        this.firstChart();
      });

      this.dbService.getUserStatictics().subscribe(response=>
        {
          this.patientCount=response.PATIENT;
          this.physicianCount=response.PHYSICIAN;
          this.nurseCount=response.NURSE;
          this.providerCount=this.physicianCount+this.nurseCount;
          this.userStat=[this.physicianCount,this.nurseCount,this.patientCount];
          this.secondChart();
        });
  }

  firstChart(){
    const one=this.elementRef.nativeElement.querySelector('#canvas');
    this.chart = new Chart(one, {
      type: 'bar',
      data: {
        labels: [
          'Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'
        ],
        datasets: [
          {
            label: 'Hospital Visits Statistics',
            data:this.monthWiseData,
            backgroundColor: [
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
              'rgba(62, 197, 91, 0.561)',
            ],
            borderWidth: 2,

          },

        ]
      },
    });
  }

  secondChart() {
    const two=this.elementRef.nativeElement.querySelector('#canvasTwo');
    this.chart = new Chart(two,{
      type: 'doughnut',
      data: {
        labels: [
          'Physicians',
          'Nurse',
          'Patient',
          
        ],
        datasets: [
          {
            label: 'Users statistics',
            data: this.userStat,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              
            ],

          }
        ]
      }
    })
  }
}
