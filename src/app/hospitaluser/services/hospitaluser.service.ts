import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diagnosis } from 'src/app/hospitaluser/model/Diagnosis';
import { Medication } from 'src/app/hospitaluser/model/Medication';
import { Procedure } from 'src/app/hospitaluser/model/Procedure';
import { URL } from 'src/app/shared/ServerSideUrl';
import { PatientMedicalHistoryDetails } from '../model/PatientMedicalHistoryDetails';

@Injectable({
  providedIn: 'root'
})
export class HospitaluserService {

  constructor(private httpObj:HttpClient) { }

  public getPhysicianDetails(physicianId:string):Observable<any>{
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/physician/"+physicianId);
  }

  public getNurseDetails(nurseId:string):Observable<any>{
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/nurse/"+nurseId);
  }

  public getDiagnosisList():Observable<Diagnosis[]>{
    return this.httpObj.get<Diagnosis[]>(URL.PROVIDER_URL+"/provider/data/diagnosis");
  }

  public getProcedureList():Observable<Procedure[]>{
    console.log("inside getProcedureList");

    return this.httpObj.get<Procedure[]>(URL.PROVIDER_URL+"/provider/data/procedures");
  }

  public getMedicationList():Observable<Medication[]>{
    console.log("inside getMedicationList");
    return this.httpObj.get<Medication[]>(URL.PROVIDER_URL+"/provider/data/medications");
  }

  public getAppointment(appointmentId:String):Observable<any>{
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/visit/"+appointmentId);
  }

  public updateAppointment(appointmentId:String):Observable<any>{
    return this.httpObj.put(URL.PROVIDER_URL+"/provider/visit/"+appointmentId,'');
  }

  public getPatientDetailByAppointmentId(appointmentId:String):Observable<any>{
    console.log("inside getPatientDetailByAppointmentId");
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/visit/patient/"+appointmentId);
  }

  public getProcedures(appointmentId:String):Observable<any>{
    console.log("inside getProcedures");
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/visit/procedures/"+appointmentId);
  }

  public getDiagnosis(appointmentId:String):Observable<any>{
    console.log("inside getDiagnosis");
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/visit/diagnosis/"+appointmentId);
  }

  public getMedications(appointmentId:String):Observable<any>{
    console.log("inside getMedications");
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/visit/medications/"+appointmentId);
  }

  public getVitalSign(appointmentId:String):Observable<any>{
    console.log("inside getVitalSign");
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/visit/vitals/"+appointmentId);
  }

  public saveVitalSigns(vitalDto:any):Observable<any>{
    return this.httpObj.post<any>(URL.PROVIDER_URL+"/provider/visit/vitals",vitalDto);
  }

  public getPhysicanNotes(appointmentId:String):Observable<any>{
    return this.httpObj.get<any>(URL.PROVIDER_URL+"/provider/visit/notes/"+appointmentId);
  }

  public submitPhysicanNotes(physicianDto:any):Observable<any>{
    return this.httpObj.post<any>(URL.PROVIDER_URL+"/provider/visit/notes",physicianDto);
  }

  public saveDiagnosisDetails(diagnosisDto:any):Observable<any>{
    console.log("inside saveDiagnosisDetails");
    return this.httpObj.post<any>(URL.PROVIDER_URL+"/provider/visit/diagnosis",diagnosisDto);
  }
  public saveProcedureDetails(procedureDto:any):Observable<any>{
    console.log("inside saveProcedureDetails");
    return this.httpObj.post<any>(URL.PROVIDER_URL+"/provider/visit/procedures",procedureDto);
  }
  public saveMedicationDetails(medicationDto:any):Observable<any>{
    console.log("inside saveMedicationDetails");
    return this.httpObj.post<any>(URL.PROVIDER_URL+"/provider/visit/medications",medicationDto);
  }

  public getPatientHistory(): Observable<PatientMedicalHistoryDetails[]> {
    return this.httpObj.get<PatientMedicalHistoryDetails[]>(URL.SCHEDULER_URL+"/scheduler/history/patients");
  }

  
  public getAllPatient(): Observable<any[]> {
    return this.httpObj.get<any[]>(URL.PATIENT_URL+"/patient/patients");
  }
}
