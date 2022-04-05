import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/ServerSideUrl';
import { AppointmentDetails } from '../model/AppointmentDetails';
import { AppointmentEditHistory } from '../model/AppointmentEditHistory';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpObj:HttpClient) { }

  public getAllPhysician():Observable<any>{
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/physicians");
  }

  public getAppointmentsOfPhysician(physicianId:String):Observable<any>{
    return this.httpObj.get<any>(URL.SCHEDULER_URL+"/scheduler/physicians/"+physicianId);
  }

  public getAppointmentEditHistory(appointmentId:number):Observable<AppointmentEditHistory>{
    return this.httpObj.get<AppointmentEditHistory>(URL.SCHEDULER_URL+"/scheduler/edit-history/"+appointmentId);
  }

  public createAppointment(appointmentDto:AppointmentDetails):Observable<AppointmentDetails>{
    return this.httpObj.post<AppointmentDetails>(URL.SCHEDULER_URL+"/scheduler/appointment",appointmentDto);
  }

  public editAppointment(appointmentDto:any):Observable<any>{
    return this.httpObj.put<any>(URL.SCHEDULER_URL+"/scheduler/appointment",appointmentDto);
  }

  public cancelAppointment(appointmentId:String):Observable<any>{
    return this.httpObj.delete<any>(URL.SCHEDULER_URL+"/scheduler/appointment/"+appointmentId);
  }
}
