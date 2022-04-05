import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/ServerSideUrl';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

 
  constructor(private httpObj:HttpClient) { }


  public getUserWithName(username:string):Observable<User[]>{
    return this.httpObj.get<User[]>(URL.INBOX_URL+"/notes"+"/"+username)
  }
}
