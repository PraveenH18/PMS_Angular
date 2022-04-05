import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/ServerSideUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpObj:HttpClient) { }

 public loginUser(uid:string,pwd:string):Observable<any>{
    const loginRequest={
      "emailId":uid,
      "password":pwd
  }
    return this.httpObj.post(URL.USER_URL+"/user/login",loginRequest);
  }

  public resetPasswordRequest(changePasswordDto:any):Observable<any>{
    return this.httpObj.post(URL.USER_URL+"/user/change-password",changePasswordDto);
  }

  public forgotPasswordRequest(forgotPasswordDto:any):Observable<any>{
    return this.httpObj.post(URL.USER_URL+"/user/forgot-password",forgotPasswordDto);
  }

  public registerPatient(patientDto:any):Observable<any>{ 
    
    return  this.httpObj.post<any>(URL.PATIENT_URL+"/patient/register", patientDto);
  }


}
