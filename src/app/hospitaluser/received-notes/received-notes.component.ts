import { Component, OnInit, ViewChild } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NotesExchanged } from '../model/NotesExchanged';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css'],

})
export class ReceivedNotesComponent implements OnInit {


  displayedColumns: string[] = ['user', 'email', 'message', 'timeStamp'];
  isUrgent:boolean=true;
  textColor:string="";

  dataSource !: MatTableDataSource<any>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public messageList: NotesExchanged[] = [];

  constructor(private notesService: NotesService, private toastr: ToastrService) {

  }

  private userId: number = JSON.parse(sessionStorage.getItem('user_id') || '{}');

  ngOnInit(): void {
    this.notesService.getMessageByReceiverId(this.userId).subscribe((res: NotesExchanged[]) => {

      res.forEach(e => {
        let notes;
        let date = moment(new Date(e.timeStamp));
        let dateMoment = date.fromNow()
        let transformDateStr = dateMoment.toString();
        let urgentMessage = "";
        if (e.message.startsWith("!")) {
          let index: number = e.message.indexOf(")");
          urgentMessage = "!"+e.message.substring(index+1, e.message.length);
          let isUrgent=true;
          notes = new NotesExchanged(e.user, urgentMessage, transformDateStr, e.emailId,isUrgent);
        } else {
          let isUrgent= false;
          notes = new NotesExchanged(e.user, e.message, transformDateStr, e.emailId,isUrgent);
         
        }
       // notes = new NotesExchanged(e.user, e.message, transformDateStr, e.emailId);
        this.messageList.push(notes);

        this.dataSource = new MatTableDataSource(this.messageList);

        this.dataSource.paginator = this.paginator;
      });

    }, (error) => {
      this.toastr.info("No messages found");
    });
  }

}
