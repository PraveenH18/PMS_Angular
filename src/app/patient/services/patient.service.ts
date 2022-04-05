import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/ServerSideUrl';
import { Allergy } from '../model/Allergy';
import { PatientDetails } from '../model/PatientDetails';
import { PatientMedicalHistoryDetails } from '../model/PatientMedicalHistoryDetails';
import { PatientRegistrationDetails } from '../model/patientRegDetails';
import { UpdateDemographicDetails } from '../model/updateDemographicDetails';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpObj: HttpClient) { }


  url: string = URL.PATIENT_URL+"/patient/allergy";

  /**********************Allergy details DB operations******************** */

  public getAllAllergies(): Observable<Allergy[]> {
    return this.httpObj.get<Allergy[]>(this.url);
  }

  public getAllergyById(id: string): Observable<Allergy> {

    //return this.httpObj.get<Allergy>("http://localhost:6060/patient/patient/allergy" + "/" + id);
    return this.httpObj.get<Allergy>(URL.PATIENT_URL+"/patient/allergy" + "/" + id);
  }

  public getAllergyNames(allergyType:string):Observable<string[]>{
    return this.httpObj.get<string[]>(URL.PATIENT_URL+"/patient/allergyNames" + "/" + allergyType);
  }

  public getAllergySources(allergyName:string):Observable<string[]>{
    return this.httpObj.get<string[]>(URL.PATIENT_URL+"/patient/allergySources" + "/" + allergyName);
  }

  public getAllergyClinicalInfo(allergySource:string):Observable<string[]>{
    return this.httpObj.get<string[]>(URL.PATIENT_URL+"/patient/allergyClinicalInfo" + "/" + allergySource);
  }

  public getAllergyIds(allergyType:string, allergyName:string, allergySource:string, allerginicity:string):Observable<string[]>{
    return this.httpObj.get<string[]>(URL.PATIENT_URL+"/patient/allergyIds/"+"/"+allergyType+"/"+allergyName+"/"+allergySource+"/"+allerginicity);
  }
/****************************************Allergy details DB operations*******************************************************/
  public updateDemographicDetails(updatedDemographicDetails:UpdateDemographicDetails,id:number):Observable<any>{

    return this.httpObj.put<any>(URL.PATIENT_URL+"/patient/demographic"+"/"+id, updatedDemographicDetails);

  }



  public getPatientDemographicById(id:number): Observable<any> {
    return this.httpObj.get<any>(URL.PATIENT_URL+"/patient/demographic/"+ id);

  }

  public savePatientDemographicDetails(id:number, patientDetails:JSON): Observable<PatientDetails> {
  

    return this.httpObj.post<PatientDetails>(URL.PATIENT_URL+"/patient/demographic"+"/"+id,patientDetails);

  }


  public getPatientRegDetailsById(id:number): Observable<PatientRegistrationDetails> {
    return this.httpObj.get<PatientRegistrationDetails>(URL.PATIENT_URL+"/patient/patientRegDetails" + "/" + id);

  }

  public deleteAllergy(allergyId:string, patientId:number):Observable<any>{
 
    return this.httpObj.delete(URL.PATIENT_URL+"/patient/allergy"+"/"+allergyId+"/"+patientId)
  }
  
 public getPatientHistory(id:number): Observable<PatientMedicalHistoryDetails[]> {
    return this.httpObj.get<PatientMedicalHistoryDetails[]>(URL.SCHEDULER_URL+"/scheduler/history/patient/"+ id);
  }

  public getDashboardDetails(patientId:number): Observable<any> {
   
    return this.httpObj.get<any>(URL.PATIENT_URL+"/patient/dashboard/"+patientId);
  }
}
