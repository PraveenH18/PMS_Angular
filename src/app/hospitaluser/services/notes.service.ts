import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/ServerSideUrl';
import { NotesExchanged } from '../model/NotesExchanged';
import { SendNotes } from '../model/SendNotes';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpObj:HttpClient) { }

  public getMessageByReceiverId(id:number):Observable<NotesExchanged[]>{
    return this.httpObj.get<NotesExchanged[]>(URL.INBOX_URL+"/notes/receiver"+"/"+id)
  }

  public getMessageBySenderId(id:number):Observable<NotesExchanged[]>{
    return this.httpObj.get<NotesExchanged[]>(URL.INBOX_URL+"/notes/sender"+"/"+id)
  }

  public sendMessage(messageBody:SendNotes):Observable<any>{
    console.log(messageBody);
    return this.httpObj.post<any>(URL.INBOX_URL+"/notes/message",messageBody);
  }


}
