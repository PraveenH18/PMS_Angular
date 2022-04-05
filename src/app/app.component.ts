import { Component } from '@angular/core';
import {  
  DayService,  
  WeekService,  
  WorkWeekService,  
  MonthService,  
  AgendaService,  
  EventSettingsModel  
} from '@syncfusion/ej2-angular-schedule';  

@Component({
  selector: 'app-root',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PMS_Angular';
}
