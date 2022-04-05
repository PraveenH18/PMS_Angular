import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/ServerSideUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }
  

  // populateForm(row){
  //   this.form.setValue
  // }
  
  updateDiagnosis(data:any, id:any){
    
    return this.http.put<any>(URL.PROVIDER_URL+"/provider/data/diagnosisData"+id,data);
  }

  updateMedication(data:any, id:any){
    return this.http.put<any>(URL.PROVIDER_URL+"/provider/data/medicationData"+id,data);
  }
  updateProcedure(data:any,id:any){

  return this.http.put<any>(URL.PROVIDER_URL+"/provider/data/proceduresData"+id,data);
  }
  
  postDiagnosis(data: any):Observable<any>{
    //console.log(diagnosisDto);
    return this.http.post<any>(URL.PROVIDER_URL+"/provider/data/diagnosisData",data)
  }

  postMedications(data: any):Observable<any>{
    //console.log(medicationDto);
    return this.http.post<any>(URL.PROVIDER_URL+"/provider/data/medicationData",data)
   }

  postProcedures(data: any):Observable<any>{
    //console.log(procedureDto);
    return this.http.post(URL.PROVIDER_URL+"/provider/data/procedureData",data)
  }


  getDiagnosis(){
    return this.http.get<any>(URL.PROVIDER_URL+"/provider/data/diagnosis")
    
  }

  getMedications(){
    return this.http.get<any>(URL.PROVIDER_URL+"/provider/data/medications")
  }

  getProcedures(){
    return this.http.get<any>(URL.PROVIDER_URL+"/provider/data/procedures")
  }


  postEmpl(data : any){
      return this.http.post<any>(URL.ADMIN_URL+"/admin/provider", data)
  }


  getEmpl(){
    return this.http.get<any>(URL.ADMIN_URL+"/admin/users")
    }

    changeStatus(statusDto:any) {
      return this.http.put(URL.ADMIN_URL+"/admin/changeStatus", statusDto);
    }
  

    getPatient() {
      return this.http.get<any>(URL.ADMIN_URL+"/admin/patientusers");
    }
  
    getEmplById(id:any){
      return this.http.get<any>(URL.ADMIN_URL+"/admin/user/"+id);
    }
  
    getPatientById(id:any){
      return this.http.get<any>(URL.ADMIN_URL+"/admin/patient/"+id);
    }

    getVisitStatictics(){
      return this.http.get<any>(URL.SCHEDULER_URL+"/scheduler/appointment-stats");
    }

    getUserStatictics(){
      return this.http.get<any>(URL.USER_URL+"/user/stats");
    }

}
