import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NotesExchanged } from '../model/NotesExchanged';
import { NotesService } from '../services/notes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sent-notes',
  templateUrl: './sent-notes.component.html',
  styleUrls: ['./sent-notes.component.css']
})
export class SentNotesComponent implements OnInit {

  displayedColumns: string[] = ['user','email', 'message', 'timeStamp'];
  // dataSource =  new MatTableDataSource<any>(ELEMENT_DATA);
  dataSource !: MatTableDataSource<any>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public messageList:NotesExchanged[]=[];
  public urgentMessage:string="";

  constructor(private notesService: NotesService,private toastr:ToastrService) { }

  private userId: number = JSON.parse(sessionStorage.getItem('user_id') || '{}');

  ngOnInit(): void {
    this.notesService.getMessageBySenderId(this.userId).subscribe((res: NotesExchanged[]) => {
      res.forEach(e => {
        let notes;
        let date = moment(new Date(e.timeStamp));
        let dateMoment = date.fromNow()
        let transformDateStr= dateMoment.toString();
        let urgentMessage = "";
        if (e.message.startsWith("!")) {
          console.log("inside if urgent")
          let index: number = e.message.indexOf(")");
          urgentMessage = e.message.substring(index+1, e.message.length);
          let isUrgent=true;
          notes = new NotesExchanged(e.user, urgentMessage, transformDateStr, e.emailId,isUrgent);
        } else {
          let isUrgent= false;
          notes = new NotesExchanged(e.user, e.message, transformDateStr, e.emailId,isUrgent);
         
        }

        this.messageList.push(notes);
        this.dataSource = new MatTableDataSource(this.messageList);
        this.dataSource.paginator = this.paginator;
      });

    },error=>{
      this.toastr.info("No messages found");
    });
  }

}
