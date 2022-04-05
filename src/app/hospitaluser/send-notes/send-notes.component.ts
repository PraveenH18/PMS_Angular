import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SendNotes } from '../model/SendNotes';
import { User } from '../model/User';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-send-notes',
  templateUrl: './send-notes.component.html',
  styleUrls: ['./send-notes.component.css']
})
export class SendNotesComponent implements OnInit {

  constructor(private notesService: NotesService, private toastr: ToastrService, private dialogRef: MatDialog) { }
  public receiver: User = new User;
  public userRole!: string;
  public sender!:any;

  ngOnInit(): void {
    let role = sessionStorage.getItem('role');
    if (role) {
      this.userRole = role;
    }
    const senderStr: string | null = sessionStorage.getItem(this.userRole);
    if (senderStr) {
      this.sender = JSON.parse(senderStr);
    }
  }

  messages: FormControl = new FormControl('', [Validators.maxLength(190), Validators.required]);
  urgency: FormControl = new FormControl('No', Validators.required);

  public messageForm: FormGroup = new FormGroup({
    messages: this.messages,
    urgency: this.urgency
  });

  public sendNote(): void {
    let messageBody: SendNotes = new SendNotes();
    if (this.messageForm.invalid) {
      this.toastr.error('EmptyFields');
    } else {
      let message: string = this.messageForm.controls['messages'].value
      if (this.messageForm.controls['urgency'].value === 'Yes') {
        messageBody.message = "!(URGENT) " + message;
      } else {
        messageBody.message = this.messageForm.controls['messages'].value;
      }
      if (this.userRole.toLowerCase() == 'physician') {
        messageBody.senderId = this.sender.employee.user.userId;
        messageBody.senderName = this.sender.employee.firstName;
        messageBody.senderEmailAddress = this.sender.employee.user.emailId;
        messageBody.sendersRole = this.userRole.toUpperCase();
      }
      if (this.userRole.toLowerCase() == 'nurse') {
        messageBody.senderId = this.sender.user.userId;
        messageBody.senderName = this.sender.firstName;
        messageBody.senderEmailAddress = this.sender.user.emailId;
        messageBody.sendersRole = this.userRole.toUpperCase();
      }
      messageBody.receiverId = this.receiver.userId;
      messageBody.receiverName = this.receiver.firstName;
      messageBody.receiverEmailAddress = this.receiver.emailId;
      messageBody.receiversRole = this.receiver.role

      this.notesService.sendMessage(messageBody).subscribe(res => {
        
      });
      this.toastr.success("Message sent")
      this.dialogRef.closeAll();
    }

  }

}
